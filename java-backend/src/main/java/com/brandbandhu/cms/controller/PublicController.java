package com.brandbandhu.cms.controller;

import com.brandbandhu.cms.config.AppProperties;
import com.brandbandhu.cms.model.BlogPost;
import com.brandbandhu.cms.model.CaseStudy;
import com.brandbandhu.cms.repository.BlogPostRepository;
import com.brandbandhu.cms.repository.CaseStudyRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PublicController {
  private final BlogPostRepository blogPostRepository;
  private final CaseStudyRepository caseStudyRepository;
  private final AppProperties appProperties;

  public PublicController(
    BlogPostRepository blogPostRepository,
    CaseStudyRepository caseStudyRepository,
    AppProperties appProperties
  ) {
    this.blogPostRepository = blogPostRepository;
    this.caseStudyRepository = caseStudyRepository;
    this.appProperties = appProperties;
  }

  @GetMapping("/blogs")
  public List<Map<String, Object>> blogs() {
    return blogPostRepository.findByPublishedTrueOrderByPublishedAtDesc().stream().map(this::blogResponse).toList();
  }

  @GetMapping("/blogs/{slug}")
  public ResponseEntity<?> blogBySlug(@PathVariable String slug) {
    Optional<BlogPost> blog = blogPostRepository.findBySlug(slug);
    if (blog.isEmpty() || !Boolean.TRUE.equals(blog.get().getPublished())) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Blog not found"));
    }
    return ResponseEntity.ok(blogResponse(blog.get()));
  }

  @GetMapping("/blogs/{id}/image")
  public ResponseEntity<?> blogImage(@PathVariable Long id) {
    Optional<BlogPost> blog = blogPostRepository.findById(id);
    if (blog.isEmpty() || !Boolean.TRUE.equals(blog.get().getPublished()) || blog.get().getImageData() == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Image not found"));
    }
    String mime = blog.get().getImageMimeType() == null ? MediaType.APPLICATION_OCTET_STREAM_VALUE : blog.get().getImageMimeType();
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_TYPE, mime)
      .body(blog.get().getImageData());
  }

  @GetMapping("/case-studies")
  public List<Map<String, Object>> caseStudies() {
    return caseStudyRepository.findByPublishedTrueOrderByPublishedAtDesc().stream().map(this::caseStudyResponse).toList();
  }

  @GetMapping("/case-studies/{slug}")
  public ResponseEntity<?> caseStudyBySlug(@PathVariable String slug) {
    Optional<CaseStudy> cs = caseStudyRepository.findBySlug(slug);
    if (cs.isEmpty() || !Boolean.TRUE.equals(cs.get().getPublished())) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Case study not found"));
    }
    return ResponseEntity.ok(caseStudyResponse(cs.get()));
  }

  @GetMapping("/case-studies/{id}/image")
  public ResponseEntity<?> caseStudyImage(@PathVariable Long id) {
    Optional<CaseStudy> cs = caseStudyRepository.findById(id);
    if (cs.isEmpty() || !Boolean.TRUE.equals(cs.get().getPublished()) || cs.get().getImageData() == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Image not found"));
    }
    String mime = cs.get().getImageMimeType() == null ? MediaType.APPLICATION_OCTET_STREAM_VALUE : cs.get().getImageMimeType();
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_TYPE, mime)
      .body(cs.get().getImageData());
  }

  @PostMapping("/contact")
  public ResponseEntity<?> contact(@RequestBody Map<String, Object> body) {
    String name = String.valueOf(body.getOrDefault("name", "")).trim();
    String email = String.valueOf(body.getOrDefault("email", "")).trim();
    String phone = String.valueOf(body.getOrDefault("phone", "")).trim();
    String service = String.valueOf(body.getOrDefault("service", "")).trim();
    String message = String.valueOf(body.getOrDefault("message", "")).trim();

    if (name.isEmpty() || email.isEmpty() || message.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Name, email, and message are required"));
    }

    String webhookUrl = appProperties.getPrivyrWebhookUrl();
    if (webhookUrl == null || webhookUrl.isBlank()) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Contact webhook is not configured"));
    }

    Map<String, Object> payload = new LinkedHashMap<>();
    payload.put("name", name);
    payload.put("email", email);
    payload.put("phone", phone);
    payload.put("service", service);
    payload.put("message", message);
    payload.put("source", "BrandBandhu Contact Form");

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

    try {
      ResponseEntity<String> privyrResponse = postJsonWebhook(webhookUrl, requestEntity);
      if (!privyrResponse.getStatusCode().is2xxSuccessful()) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of("message", "Failed to submit lead to notification provider"));
      }

      String sheetsWebhookUrl = appProperties.getGoogleSheetsWebhookUrl();
      if (sheetsWebhookUrl != null && !sheetsWebhookUrl.isBlank()) {
        postJsonWebhook(sheetsWebhookUrl, requestEntity);
      }

      return ResponseEntity.ok(Map.of("ok", true));
    } catch (RestClientException error) {
      return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of("message", "Failed to submit lead to notification provider"));
    }
  }

  private ResponseEntity<String> postJsonWebhook(String url, HttpEntity<Map<String, Object>> requestEntity) {
    return new RestTemplate().exchange(url, HttpMethod.POST, requestEntity, String.class);
  }

  private Map<String, Object> blogResponse(BlogPost blog) {
    Map<String, Object> out = new LinkedHashMap<>();
    out.put("id", blog.getId());
    out.put("title", blog.getTitle());
    out.put("slug", blog.getSlug());
    out.put("excerpt", blog.getExcerpt() == null ? "" : blog.getExcerpt());
    out.put("content", blog.getContent());
    out.put("published", blog.getPublished());
    out.put("publishedAt", blog.getPublishedAt());
    out.put("createdAt", blog.getCreatedAt());
    out.put("updatedAt", blog.getUpdatedAt());
    out.put("hasImage", blog.getImageData() != null);
    out.put("imageUrl", blog.getImageData() != null ? "/api/blogs/" + blog.getId() + "/image" : null);
    return out;
  }

  private Map<String, Object> caseStudyResponse(CaseStudy cs) {
    Map<String, Object> out = new LinkedHashMap<>();
    out.put("id", cs.getId());
    out.put("title", cs.getTitle());
    out.put("slug", cs.getSlug());
    out.put("clientName", cs.getClientName() == null ? "" : cs.getClientName());
    out.put("industry", cs.getIndustry() == null ? "" : cs.getIndustry());
    out.put("challenge", cs.getChallenge());
    out.put("solution", cs.getSolution());
    out.put("results", cs.getResults());
    out.put("published", cs.getPublished());
    out.put("publishedAt", cs.getPublishedAt());
    out.put("createdAt", cs.getCreatedAt());
    out.put("updatedAt", cs.getUpdatedAt());
    out.put("hasImage", cs.getImageData() != null);
    out.put("imageUrl", cs.getImageData() != null ? "/api/case-studies/" + cs.getId() + "/image" : null);
    return out;
  }
}
