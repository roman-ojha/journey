FROM node:20.9.0-alpine

WORKDIR /app/user-api-gateway

COPY ./package.json .

COPY ./yarn.lock .

RUN npm install -g typescript

RUN yarn install

COPY . .

COPY ./temp/ /app/

RUN tsc

RUN yarn prisma:generate

EXPOSE 8001

CMD [ "yarn", "start" ]