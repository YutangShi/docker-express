FROM node:latest

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
RUN mkdir /myapp

WORKDIR /myapp

ADD app/ackage.json /myapp/package.json

RUN npm install

ADD ./app /myapp

CMD ["npm", "start"]
