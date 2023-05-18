FROM arm64v8/node:current-alpine
# FROM node:current-alpine

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD [ "yarn", "start" ]