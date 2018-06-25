FROM node

WORKDIR /usr/src/app

COPY ["package.json", "codecept.json*", "./"]

RUN npm install

COPY . .

EXPOSE 2300

CMD ["node","server.js"]
