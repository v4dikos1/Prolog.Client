FROM node:latest as builder

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /react-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
