FROM node:alpine

WORKDIR /

ENV PATH / node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

RUN apk --no-cache add curl

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "nodemon" ]