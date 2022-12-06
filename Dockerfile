FROM node:18

RUN npm i -g yarn

WORKDIR /app
COPY .yarn ./
COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM lipanski/docker-static-website:latest

COPY --from=0 /app/dist .