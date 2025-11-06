import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = environment;

  constructor() {}

  // API URLs
  getAuthApiUrl(): string {
    return this.config.apiUrls.auth;
  }

  getHRApiUrl(): string {
    return this.config.apiUrls.hr;
  }

  getBudgetApiUrl(): string {
    return this.config.apiUrls.budget;
  }

  getClaimsApiUrl(): string {
    return this.config.apiUrls.claims;
  }

  getReportsApiUrl(): string {
    return this.config.apiUrls.reports;
  }

  // AI URLs
  getAISecurityUrl(): string {
    return this.config.aiUrls.security;
  }

  getAIAnalyticsUrl(): string {
    return this.config.aiUrls.analytics;
  }

  getAIBudgetUrl(): string {
    return this.config.aiUrls.budget;
  }

  getAIClaimsUrl(): string {
    return this.config.aiUrls.claims;
  }

  getAIHRUrl(): string {
    return this.config.aiUrls.hr;
  }

  // Features
  isProduction(): boolean {
    return this.config.production;
  }

  isAIEnabled(): boolean {
    return this.config.features.enableAI;
  }

  isAnalyticsEnabled(): boolean {
    return this.config.features.enableAnalytics;
  }

  isRealTimeUpdatesEnabled(): boolean {
    return this.config.features.enableRealTimeUpdates;
  }

  isNotificationsEnabled(): boolean {
    return this.config.features.enableNotifications;
  }

  // Logging
  getLogLevel(): string {
    return this.config.logging.level;
  }

  isConsoleLoggingEnabled(): boolean {
    return this.config.logging.enableConsole;
  }

  isRemoteLoggingEnabled(): boolean {
    return this.config.logging.enableRemote;
  }

  // Cache
  isCacheEnabled(): boolean {
    return this.config.cache.enabled;
  }

  getCacheTTL(): number {
    return this.config.cache.ttl;
  }

  // Pagination
  getDefaultPageSize(): number {
    return this.config.pagination.defaultPageSize;
  }

  getPageSizeOptions(): number[] {
    return this.config.pagination.pageSizeOptions;
  }

  // Full config access
  getConfig(): any {
    return this.config;
  }
}
