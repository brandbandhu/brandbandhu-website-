package com.brandbandhu.cms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admin_sessions")
public class AdminSession {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 128)
  private String tokenHash;

  @Column(nullable = false)
  private LocalDateTime expiresAt;

  private LocalDateTime revokedAt;

  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  @JoinColumn(name = "admin_user_id")
  private AdminUser adminUser;

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
  public String getTokenHash() { return tokenHash; }
  public void setTokenHash(String tokenHash) { this.tokenHash = tokenHash; }
  public LocalDateTime getExpiresAt() { return expiresAt; }
  public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
  public LocalDateTime getRevokedAt() { return revokedAt; }
  public void setRevokedAt(LocalDateTime revokedAt) { this.revokedAt = revokedAt; }
  public AdminUser getAdminUser() { return adminUser; }
  public void setAdminUser(AdminUser adminUser) { this.adminUser = adminUser; }
}
