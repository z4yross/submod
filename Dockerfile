FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN yarn
COPY ./app /app

CMD [ "yarn", "start" ]