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

  @Value("${app.privyr-webhook-url:}")
  private String privyrWebhookUrl;

  @Value("${app.google-sheets-webhook-url:}")
  private String googleSheetsWebhookUrl;

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

  public String getPrivyrWebhookUrl() {
    return privyrWebhookUrl;
  }

  public String getGoogleSheetsWebhookUrl() {
    return googleSheetsWebhookUrl;
  }
}
