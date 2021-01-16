FROM node:14.15.4-alpine3.12

RUN mkdir /app

WORKDIR /app

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

COPY . /app

RUN npm install
RUN npm install -g typescript
RUN tsc

CMD node build/index.js
