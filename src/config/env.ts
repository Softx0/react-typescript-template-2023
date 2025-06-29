export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000", 10)
  },
  jwt: {
    secret: import.meta.env.VITE_JWT_SECRET || "default-secret",
    expiresIn: import.meta.env.VITE_JWT_EXPIRES_IN || "24h"
  },
  features: {
    enableInactivityTimer: import.meta.env.VITE_ENABLE_INACTIVITY_TIMER === "true",
    defaultInactivityTime: parseInt(import.meta.env.VITE_DEFAULT_INACTIVITY_TIME || "300000", 10)
  },
  environment: import.meta.env.VITE_ENVIRONMENT || "development"
} as const;
