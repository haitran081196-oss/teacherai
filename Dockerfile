# File: frontend/Dockerfile
# Giai đoạn Build
FROM node:20-slim as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Giai đoạn Serve (Dùng Nginx nhẹ hơn)
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]