FROM node:alpine

WORKDIR /client

COPY ./package*.json ./

COPY . .

RUN npm install

CMD [ "npm", "start" ]