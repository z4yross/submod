FROM node:current-alpine as node

WORKDIR /app
COPY package*.json ./
RUN yarn
COPY ./app /app

CMD [ "yarn", "start" ]