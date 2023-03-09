FROM node:latest as alpine

WORKDIR /user/src/app

COPY . .

RUN npm i

RUN npm run build --prod

USER node

CMD ["npm", "run", "start:prod"]
