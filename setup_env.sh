#!/bin/bash

# React TypeScript Template 2024 - Environment Setup Script
# Usage: ./setup_env.sh [DEV|QA|PROD]

env=$1

if [ -z "$env" ]; then
  echo "Error: Environment not specified"
  echo "Usage: ./setup_env.sh [DEV|QA|PROD]"
  exit 1
fi

echo "🚀 Setting up environment variables for: $env"

# Docker & Build Variables
TAG_IMAGE=TAG_IMAGE_$env
NODE_ENV=NODE_ENV_$env
PORT=PORT_$env

# API Configuration Variables
VITE_API_BASE_URL=VITE_API_BASE_URL_$env
VITE_API_TIMEOUT=VITE_API_TIMEOUT_$env

# JWT Configuration Variables
VITE_JWT_SECRET=VITE_JWT_SECRET_$env
VITE_JWT_EXPIRES_IN=VITE_JWT_EXPIRES_IN_$env

# Feature Flags
VITE_ENABLE_INACTIVITY_TIMER=VITE_ENABLE_INACTIVITY_TIMER_$env
VITE_DEFAULT_INACTIVITY_TIME=VITE_DEFAULT_INACTIVITY_TIME_$env

# Environment Specific
VITE_ENVIRONMENT=VITE_ENVIRONMENT_$env

# Legacy Variables (backward compatibility)
VITE_REACT_APP_API_URL=REACT_APP_API_URL_$env
VITE_REACT_APP_API_KEY=REACT_APP_API_KEY_$env

echo "📝 Writing environment variables to ../env file"

# Create or clear the env file
echo "# Generated environment file for $env environment" > ../env
echo "# Generated on: $(date)" >> ../env
echo "" >> ../env

# Docker & Build Variables
echo "TAG_IMAGE=${!TAG_IMAGE}" >> ../env
echo "NODE_ENV=${!NODE_ENV}" >> ../env
echo "PORT=${!PORT}" >> ../env
echo "" >> ../env

# API Configuration
echo "VITE_API_BASE_URL=${!VITE_API_BASE_URL}" >> ../env
echo "VITE_API_TIMEOUT=${!VITE_API_TIMEOUT}" >> ../env
echo "" >> ../env

# JWT Configuration
echo "VITE_JWT_SECRET=${!VITE_JWT_SECRET}" >> ../env
echo "VITE_JWT_EXPIRES_IN=${!VITE_JWT_EXPIRES_IN}" >> ../env
echo "" >> ../env

# Feature Flags
echo "VITE_ENABLE_INACTIVITY_TIMER=${!VITE_ENABLE_INACTIVITY_TIMER}" >> ../env
echo "VITE_DEFAULT_INACTIVITY_TIME=${!VITE_DEFAULT_INACTIVITY_TIME}" >> ../env
echo "" >> ../env

# Environment
echo "VITE_ENVIRONMENT=${!VITE_ENVIRONMENT}" >> ../env
echo "" >> ../env

# Legacy Variables (backward compatibility)
echo "VITE_REACT_APP_API_URL=${!VITE_REACT_APP_API_URL}" >> ../env
echo "VITE_REACT_APP_API_KEY=${!VITE_REACT_APP_API_KEY}" >> ../env

echo "✅ Environment setup completed for: $env"
echo "📄 Environment file generated at: ../env"
echo ""
echo "🔧 Next steps:"
echo "1. Review the generated ../env file"
echo "2. Ensure all required environment variables are set in your CI/CD system"
echo "3. Run 'docker build' or 'npm run build' to build the application"