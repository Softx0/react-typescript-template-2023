FROM node:18 AS builder
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn
# Copy app files
COPY . .

# build stage
FROM builder as build-stage
# Build the app
RUN yarn build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as build
# Copy built assets from builder
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]