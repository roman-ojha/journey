FROM node:16.5.0-alpine

WORKDIR /app

COPY ./package.json .

COPY ./yarn.lock .

RUN npm install -g typescript
RUN npm install -g serve

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "serve", "-s", "build" ]