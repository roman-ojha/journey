FROM node:20.9.0-alpine

WORKDIR /app

COPY ./package.json .

COPY ./yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]