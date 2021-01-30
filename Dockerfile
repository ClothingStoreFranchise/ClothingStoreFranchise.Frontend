FROM node:latest AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY frontend-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/Frontend/ /usr/share/nginx/html
