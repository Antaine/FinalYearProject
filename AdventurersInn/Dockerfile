FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/AdventurersInn usr/share/nginx/html
