FROM node:20.9.0-alpine

WORKDIR /app

COPY ./package.json .

COPY ./yarn.lock .

RUN npm install -g typescript

RUN yarn install

COPY . .

# RUN yarn prisma:generate
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npx prisma generate --schema ./prisma/merchant-v-and-t-service.prisma
RUN npx prisma generate --schema ./prisma/user-service.prisma

RUN tsc

EXPOSE 8009 

CMD ["yarn", "start" ]