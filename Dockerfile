FROM node:latest as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY --from=builder /app/dist /usr/share/nginx

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]