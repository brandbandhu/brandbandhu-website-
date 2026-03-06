package com.brandbandhu.cms.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppProperties {
  @Value("${app.client-origin}")
  private String clientOrigin;

  @Value("${app.admin-username}")
  private String adminUsername;

  @Value("${app.admin-password}")
  private String adminPassword;

  @Value("${app.session-cookie-name}")
  private String sessionCookieName;

  @Value("${app.session-ttl-hours}")
  private int sessionTtlHours;

  public String getClientOrigin() {
    return clientOrigin;
  }

  public String getAdminUsername() {
    return adminUsername;
  }

  public String getAdminPassword() {
    return adminPassword;
  }

  public String getSessionCookieName() {
    return sessionCookieName;
  }

  public int getSessionTtlHours() {
    return sessionTtlHours;
  }
}
