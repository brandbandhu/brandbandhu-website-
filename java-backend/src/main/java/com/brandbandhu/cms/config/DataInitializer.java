package com.brandbandhu.cms.config;

import com.brandbandhu.cms.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
  private final AuthService authService;

  public DataInitializer(AuthService authService) {
    this.authService = authService;
  }

  @Override
  public void run(String... args) {
    authService.seedAdminIfMissing();
  }
}
