// Production environment configuration
export const environment = {
  production: true,
  apiUrls: {
    auth: '/api/auth',
    hr: '/api/hr',
    budget: '/api/budget',
    claims: '/api/claims',
    reports: '/api/reports'
  },
  aiUrls: {
    security: '/ai/security',
    analytics: '/ai/analytics',
    budget: '/ai/budget',
    claims: '/ai/claims',
    hr: '/ai/hr'
  },
  features: {
    enableAI: true,
    enableAnalytics: true,
    enableRealTimeUpdates: true,
    enableNotifications: true
  },
  logging: {
    level: 'error',
    enableConsole: false,
    enableRemote: true
  },
  cache: {
    enabled: true,
    ttl: 600000 // 10 minutes
  },
  pagination: {
    defaultPageSize: 25,
    pageSizeOptions: [10, 25, 50, 100]
  }
};
