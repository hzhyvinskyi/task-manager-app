FROM node:10.16.0-alpine

RUN apk add --no-cache --virtual .gyp python make g++ bash

WORKDIR /opt/task-manager-app/

RUN npm install -g nodemon ts-node typescript typeorm

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 3000
