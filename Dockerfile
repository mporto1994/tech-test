FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN NODE_ENV=production npm install

COPY . .

EXPOSE 3003

CMD ["npm", "run", "dev"]
