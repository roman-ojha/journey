FROM node:20.9.0-alpine

WORKDIR /app

COPY ./package.json .

# COPY ./yarn.lock .

# RUN npm install -g corepack

# RUN corepack enable

# RUN rm -rf node_modules
# RUN yarn install
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm","run","start"]