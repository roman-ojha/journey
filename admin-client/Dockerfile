FROM node:16.5.0-alpine

WORKDIR /app

COPY ./package.json .

COPY ./yarn.lock .

RUN npm install -g typescript

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn","start" ]