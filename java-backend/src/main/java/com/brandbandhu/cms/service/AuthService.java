package com.brandbandhu.cms.service;

import com.brandbandhu.cms.config.AppProperties;
import com.brandbandhu.cms.model.AdminSession;
import com.brandbandhu.cms.model.AdminUser;
import com.brandbandhu.cms.repository.AdminSessionRepository;
import com.brandbandhu.cms.repository.AdminUserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
  private final AdminUserRepository adminUserRepository;
  private final AdminSessionRepository adminSessionRepository;
  private final PasswordEncoder passwordEncoder;
  private final AppProperties appProperties;

  public AuthService(
    AdminUserRepository adminUserRepository,
    AdminSessionRepository adminSessionRepository,
    PasswordEncoder passwordEncoder,
    AppProperties appProperties
  ) {
    this.adminUserRepository = adminUserRepository;
    this.adminSessionRepository = adminSessionRepository;
    this.passwordEncoder = passwordEncoder;
    this.appProperties = appProperties;
  }

  public void seedAdminIfMissing() {
    Optional<AdminUser> existing = adminUserRepository.findByUsername(appProperties.getAdminUsername());
    if (existing.isEmpty()) {
      AdminUser user = new AdminUser();
      user.setUsername(appProperties.getAdminUsername());
      user.setPasswordHash(passwordEncoder.encode(appProperties.getAdminPassword()));
      adminUserRepository.save(user);
    }
  }

  public Optional<AdminUser> verifyCredentials(String username, String password) {
    return adminUserRepository.findByUsername(username)
      .filter(user -> passwordEncoder.matches(password, user.getPasswordHash()));
  }

  public String createSession(AdminUser adminUser) {
    String rawToken = UUID.randomUUID().toString() + UUID.randomUUID();
    AdminSession session = new AdminSession();
    session.setAdminUser(adminUser);
    session.setTokenHash(sha256(rawToken));
    session.setExpiresAt(LocalDateTime.now().plusHours(appProperties.getSessionTtlHours()));
    adminSessionRepository.save(session);
    return rawToken;
  }

  public Optional<AdminUser> authenticateRequest(HttpServletRequest request) {
    String token = readCookie(request, appProperties.getSessionCookieName());
    if (token == null || token.isBlank()) {
      return Optional.empty();
    }
    return adminSessionRepository
      .findByTokenHashAndRevokedAtIsNullAndExpiresAtAfter(sha256(token), LocalDateTime.now())
      .map(AdminSession::getAdminUser);
  }

  public void revokeSession(HttpServletRequest request) {
    String token = readCookie(request, appProperties.getSessionCookieName());
    if (token == null || token.isBlank()) return;
    adminSessionRepository
      .findByTokenHashAndRevokedAtIsNullAndExpiresAtAfter(sha256(token), LocalDateTime.now())
      .ifPresent(session -> {
        session.setRevokedAt(LocalDateTime.now());
        adminSessionRepository.save(session);
      });
  }

  private String readCookie(HttpServletRequest request, String cookieName) {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) return null;
    for (Cookie cookie : cookies) {
      if (cookieName.equals(cookie.getName())) {
        return cookie.getValue();
      }
    }
    return null;
  }

  private String sha256(String value) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(value.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(hash);
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException("SHA-256 not available", e);
    }
  }
}
