FROM node:20.9.0-alpine

# Install Vim
RUN apk update && apk add --no-cache vim

WORKDIR /app

COPY ./package.json .

COPY ./yarn.lock .

RUN npm install -g typescript

RUN yarn install

COPY . .

RUN yarn prisma:generate

RUN tsc

EXPOSE 8006 

CMD ["yarn", "start" ]