FROM node

RUN npm i -g selenium-standalone webdriverio

RUN selenium-standalone install

RUN apt-get update && apt-get install -y supervisor

WORKDIR /usr/src/app

COPY ["package.json", "codecept.json*", "./"]

RUN npm install

COPY . .

EXPOSE 2300

CMD ["node","server.js"]
