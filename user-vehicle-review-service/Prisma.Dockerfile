FROM node:20.9.0-alpine

WORKDIR /app

RUN yarn init -y

RUN yarn add prisma @prisma/client

COPY ./prisma .

EXPOSE 5557

CMD ["npx", "prisma", "studio","--port=5557" ]