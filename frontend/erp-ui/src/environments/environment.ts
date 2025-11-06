// Development environment configuration
export const environment = {
  production: false,
  apiUrls: {
    auth: 'http://localhost:8081/api/auth',
    hr: 'http://localhost:8082/api',
    budget: 'http://localhost:8083/api',
    claims: 'http://localhost:8084/api/claims',
    reports: 'http://localhost:8085/api/reports'
  },
  aiUrls: {
    security: 'http://localhost:9001',
    analytics: 'http://localhost:9002',
    budget: 'http://localhost:9003',
    claims: 'http://localhost:9004',
    hr: 'http://localhost:9005'
  },
  features: {
    enableAI: true,
    enableAnalytics: true,
    enableRealTimeUpdates: true,
    enableNotifications: true
  },
  logging: {
    level: 'debug',
    enableConsole: true,
    enableRemote: false
  },
  cache: {
    enabled: true,
    ttl: 300000 // 5 minutes
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100]
  }
};
