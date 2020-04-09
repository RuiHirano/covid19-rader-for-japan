FROM node:10
WORKDIR /home/guest/covid19-rader-for-japan/frontend

# install dependencies
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build
RUN yarn add serve

EXPOSE 3000
CMD [ "yarn", "serve", "-s", "build", "-l", "3000"]
