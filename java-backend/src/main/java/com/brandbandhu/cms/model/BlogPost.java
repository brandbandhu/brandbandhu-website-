package com.brandbandhu.cms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_posts")
public class BlogPost {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false, unique = true)
  private String slug;

  @Column(columnDefinition = "TEXT")
  private String excerpt;

  @Lob
  @Column(columnDefinition = "LONGTEXT", nullable = false)
  private String content;

  @Column(nullable = false)
  private Boolean published = false;

  private LocalDateTime publishedAt;

  @Lob
  @Column(columnDefinition = "LONGBLOB")
  private byte[] imageData;

  private String imageMimeType;

  private String imageName;

  @Column(nullable = false)
  private LocalDateTime createdAt;

  @Column(nullable = false)
  private LocalDateTime updatedAt;

  @PrePersist
  void onCreate() {
    LocalDateTime now = LocalDateTime.now();
    createdAt = now;
    updatedAt = now;
  }

  @PreUpdate
  void onUpdate() {
    updatedAt = LocalDateTime.now();
  }

  public Long getId() { return id; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getSlug() { return slug; }
  public void setSlug(String slug) { this.slug = slug; }
  public String getExcerpt() { return excerpt; }
  public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
  public String getContent() { return content; }
  public void setContent(String content) { this.content = content; }
  public Boolean getPublished() { return published; }
  public void setPublished(Boolean published) { this.published = published; }
  public LocalDateTime getPublishedAt() { return publishedAt; }
  public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
  public byte[] getImageData() { return imageData; }
  public void setImageData(byte[] imageData) { this.imageData = imageData; }
  public String getImageMimeType() { return imageMimeType; }
  public void setImageMimeType(String imageMimeType) { this.imageMimeType = imageMimeType; }
  public String getImageName() { return imageName; }
  public void setImageName(String imageName) { this.imageName = imageName; }
  public LocalDateTime getCreatedAt() { return createdAt; }
  public LocalDateTime getUpdatedAt() { return updatedAt; }
}
