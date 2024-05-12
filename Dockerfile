FROM node:18.19.0-alpine3.19 as builder
WORKDIR /app
ENV NODE_ENV=development
COPY . /app
RUN apk add git --no-cache
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/proxy.conf /etc/nginx/proxy.conf
