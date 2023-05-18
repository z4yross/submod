FROM arm64v8/node:current-alpine

WORKDIR /app
COPY package*.json ./
RUN yarn
COPY ./app ./

CMD [ "yarn", "start" ]