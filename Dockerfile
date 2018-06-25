FROM node

RUN apt-get update && apt-get install -y python-software-properties

CMD ["add-apt-repository","ppa:webupd8team/java"]

CMD ["apt-get","update"]

CMD ["apt-get","install","-y supervisor openjdk-8-jdk"]

RUN npm i -g selenium-standalone webdriverio

CMD ["selenium-standalone","install"]

WORKDIR /usr/src/app

COPY ["package.json", "codecept.json*", "./"]

RUN npm install

COPY . .

EXPOSE 2300

CMD ["node","server.js"]
