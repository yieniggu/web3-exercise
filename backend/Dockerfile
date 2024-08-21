FROM node:22-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

FROM dependencies as builder
EXPOSE 4000
CMD npm run start