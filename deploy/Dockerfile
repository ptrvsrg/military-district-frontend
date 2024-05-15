FROM node:current-alpine as builder
WORKDIR /usr/app
COPY .. .
RUN npm install
RUN npm run build

FROM nginx:alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist /var/www/html
ENTRYPOINT ["nginx","-g","daemon off;"]