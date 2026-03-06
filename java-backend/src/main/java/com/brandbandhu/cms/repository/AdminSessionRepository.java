package com.brandbandhu.cms.repository;

import com.brandbandhu.cms.model.AdminSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface AdminSessionRepository extends JpaRepository<AdminSession, Long> {
  Optional<AdminSession> findByTokenHashAndRevokedAtIsNullAndExpiresAtAfter(String tokenHash, LocalDateTime now);
}
