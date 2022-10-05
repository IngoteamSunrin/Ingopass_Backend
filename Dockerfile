FROM node:16

WORKDIR /usr/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]