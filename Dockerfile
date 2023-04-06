FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY src ./src
RUN npm run build

RUN rm -rf node_modules
RUN npm install --only=prod


CMD ["npm", "start"]