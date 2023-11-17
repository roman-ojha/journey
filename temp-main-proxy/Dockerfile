FROM node:20.9.0-alpine

WORKDIR /app

COPY ./package.json .

COPY ./yarn.lock .

RUN yarn install

COPY . .

EXPOSE 8003

CMD ["yarn", "start"]