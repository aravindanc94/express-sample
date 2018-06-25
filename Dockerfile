FROM node

RUN apt-get update && apt-get install python-software-properties

RUN add-apt-repository ppa:openjdk-r/ppa

RUN apt-get update && apt-get install -y supervisor openjdk-8-jdk

RUN npm i -g selenium-standalone webdriverio

RUN selenium-standalone install

WORKDIR /usr/src/app

COPY ["package.json", "codecept.json*", "./"]

RUN npm install

COPY . .

EXPOSE 2300

CMD ["node","server.js"]
