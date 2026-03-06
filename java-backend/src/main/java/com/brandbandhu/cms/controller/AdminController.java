package com.brandbandhu.cms.controller;

import com.brandbandhu.cms.config.AppProperties;
import com.brandbandhu.cms.dto.LoginRequest;
import com.brandbandhu.cms.model.AdminUser;
import com.brandbandhu.cms.model.BlogPost;
import com.brandbandhu.cms.model.CaseStudy;
import com.brandbandhu.cms.repository.BlogPostRepository;
import com.brandbandhu.cms.repository.CaseStudyRepository;
import com.brandbandhu.cms.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  private final AuthService authService;
  private final BlogPostRepository blogPostRepository;
  private final CaseStudyRepository caseStudyRepository;
  private final AppProperties appProperties;

  public AdminController(
    AuthService authService,
    BlogPostRepository blogPostRepository,
    CaseStudyRepository caseStudyRepository,
    AppProperties appProperties
  ) {
    this.authService = authService;
    this.blogPostRepository = blogPostRepository;
    this.caseStudyRepository = caseStudyRepository;
    this.appProperties = appProperties;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
    Optional<AdminUser> user = authService.verifyCredentials(request.getUsername(), request.getPassword());
    if (user.isEmpty()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password"));
    }

    String token = authService.createSession(user.get());
    Cookie cookie = new Cookie(appProperties.getSessionCookieName(), token);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(appProperties.getSessionTtlHours() * 3600);
    response.addCookie(cookie);

    return ResponseEntity.ok(Map.of(
      "message", "Login successful",
      "admin", Map.of("id", user.get().getId(), "username", user.get().getUsername())
    ));
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
    authService.revokeSession(request);
    Cookie cookie = new Cookie(appProperties.getSessionCookieName(), "");
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(0);
    response.addCookie(cookie);
    return ResponseEntity.ok(Map.of("message", "Logged out"));
  }

  @GetMapping("/me")
  public ResponseEntity<?> me(HttpServletRequest request) {
    Optional<AdminUser> user = authService.authenticateRequest(request);
    if (user.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Not authenticated"));
    return ResponseEntity.ok(Map.of("admin", Map.of("id", user.get().getId(), "username", user.get().getUsername())));
  }

  @GetMapping("/blogs")
  public ResponseEntity<?> listBlogs(HttpServletRequest request) {
    if (!isAuthenticated(request)) return unauthorized();
    List<Map<String, Object>> data = blogPostRepository.findAll().stream().map(this::blogResponse).toList();
    return ResponseEntity.ok(data);
  }

  @PostMapping(value = "/blogs", consumes = {"multipart/form-data"})
  public ResponseEntity<?> createBlog(
    HttpServletRequest request,
    @RequestParam String title,
    @RequestParam String slug,
    @RequestParam(required = false) String excerpt,
    @RequestParam String content,
    @RequestParam(defaultValue = "false") boolean published,
    @RequestPart(required = false) MultipartFile image
  ) throws IOException {
    if (!isAuthenticated(request)) return unauthorized();
    BlogPost blog = new BlogPost();
    blog.setTitle(title);
    blog.setSlug(slug);
    blog.setExcerpt(excerpt);
    blog.setContent(content);
    blog.setPublished(published);
    blog.setPublishedAt(published ? LocalDateTime.now() : null);
    if (image != null && !image.isEmpty()) {
      blog.setImageData(image.getBytes());
      blog.setImageMimeType(image.getContentType());
      blog.setImageName(image.getOriginalFilename());
    }
    BlogPost created = blogPostRepository.save(blog);
    return ResponseEntity.status(HttpStatus.CREATED).body(blogResponse(created));
  }

  @PutMapping(value = "/blogs/{id}", consumes = {"multipart/form-data"})
  public ResponseEntity<?> updateBlog(
    HttpServletRequest request,
    @PathVariable Long id,
    @RequestParam String title,
    @RequestParam String slug,
    @RequestParam(required = false) String excerpt,
    @RequestParam String content,
    @RequestParam(defaultValue = "false") boolean published,
    @RequestPart(required = false) MultipartFile image
  ) throws IOException {
    if (!isAuthenticated(request)) return unauthorized();
    Optional<BlogPost> existing = blogPostRepository.findById(id);
    if (existing.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Blog not found"));
    BlogPost blog = existing.get();
    blog.setTitle(title);
    blog.setSlug(slug);
    blog.setExcerpt(excerpt);
    blog.setContent(content);
    blog.setPublished(published);
    blog.setPublishedAt(published ? LocalDateTime.now() : null);
    if (image != null && !image.isEmpty()) {
      blog.setImageData(image.getBytes());
      blog.setImageMimeType(image.getContentType());
      blog.setImageName(image.getOriginalFilename());
    }
    return ResponseEntity.ok(blogResponse(blogPostRepository.save(blog)));
  }

  @DeleteMapping("/blogs/{id}")
  public ResponseEntity<?> deleteBlog(HttpServletRequest request, @PathVariable Long id) {
    if (!isAuthenticated(request)) return unauthorized();
    if (!blogPostRepository.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Blog not found"));
    blogPostRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/case-studies")
  public ResponseEntity<?> listCaseStudies(HttpServletRequest request) {
    if (!isAuthenticated(request)) return unauthorized();
    List<Map<String, Object>> data = caseStudyRepository.findAll().stream().map(this::caseStudyResponse).toList();
    return ResponseEntity.ok(data);
  }

  @PostMapping(value = "/case-studies", consumes = {"multipart/form-data"})
  public ResponseEntity<?> createCaseStudy(
    HttpServletRequest request,
    @RequestParam String title,
    @RequestParam String slug,
    @RequestParam(required = false) String clientName,
    @RequestParam(required = false) String industry,
    @RequestParam String challenge,
    @RequestParam String solution,
    @RequestParam String results,
    @RequestParam(defaultValue = "false") boolean published,
    @RequestPart(required = false) MultipartFile image
  ) throws IOException {
    if (!isAuthenticated(request)) return unauthorized();
    CaseStudy cs = new CaseStudy();
    cs.setTitle(title);
    cs.setSlug(slug);
    cs.setClientName(clientName);
    cs.setIndustry(industry);
    cs.setChallenge(challenge);
    cs.setSolution(solution);
    cs.setResults(results);
    cs.setPublished(published);
    cs.setPublishedAt(published ? LocalDateTime.now() : null);
    if (image != null && !image.isEmpty()) {
      cs.setImageData(image.getBytes());
      cs.setImageMimeType(image.getContentType());
      cs.setImageName(image.getOriginalFilename());
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(caseStudyResponse(caseStudyRepository.save(cs)));
  }

  @PutMapping(value = "/case-studies/{id}", consumes = {"multipart/form-data"})
  public ResponseEntity<?> updateCaseStudy(
    HttpServletRequest request,
    @PathVariable Long id,
    @RequestParam String title,
    @RequestParam String slug,
    @RequestParam(required = false) String clientName,
    @RequestParam(required = false) String industry,
    @RequestParam String challenge,
    @RequestParam String solution,
    @RequestParam String results,
    @RequestParam(defaultValue = "false") boolean published,
    @RequestPart(required = false) MultipartFile image
  ) throws IOException {
    if (!isAuthenticated(request)) return unauthorized();
    Optional<CaseStudy> existing = caseStudyRepository.findById(id);
    if (existing.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Case study not found"));
    CaseStudy cs = existing.get();
    cs.setTitle(title);
    cs.setSlug(slug);
    cs.setClientName(clientName);
    cs.setIndustry(industry);
    cs.setChallenge(challenge);
    cs.setSolution(solution);
    cs.setResults(results);
    cs.setPublished(published);
    cs.setPublishedAt(published ? LocalDateTime.now() : null);
    if (image != null && !image.isEmpty()) {
      cs.setImageData(image.getBytes());
      cs.setImageMimeType(image.getContentType());
      cs.setImageName(image.getOriginalFilename());
    }
    return ResponseEntity.ok(caseStudyResponse(caseStudyRepository.save(cs)));
  }

  @DeleteMapping("/case-studies/{id}")
  public ResponseEntity<?> deleteCaseStudy(HttpServletRequest request, @PathVariable Long id) {
    if (!isAuthenticated(request)) return unauthorized();
    if (!caseStudyRepository.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Case study not found"));
    caseStudyRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  private boolean isAuthenticated(HttpServletRequest request) {
    return authService.authenticateRequest(request).isPresent();
  }

  private ResponseEntity<Map<String, String>> unauthorized() {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Not authenticated"));
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
