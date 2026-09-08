# Step 1: Build the Quasar app
FROM node:24-alpine AS build-stage

WORKDIR /app

ARG API_BASE_URL
ARG USER_INFO_KEY
ENV API_BASE_URL=$API_BASE_URL
ENV USER_INFO_KEY=$USER_INFO_KEY

# Install dependencies first using Yarn (leveraging Docker layer caching)
COPY . .
RUN yarn install --frozen-lockfile

# Build the app for production (adjust if using SPA, PWA, or SSR)
RUN yarn quasar build

# Step 2: Serve the built app with Nginx
FROM nginx:alpine AS production-stage

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from the build stage to Nginx web root
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
