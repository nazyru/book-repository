FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -a

EXPOSE 8000

CMD [ "npm", "start" ]