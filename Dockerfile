FROM node:10

# install dependencies
RUN mkdir -p /home/guest/covid19-rader-for-japan/frontend
WORKDIR /home/guest/covid19-rader-for-japan/frontend

COPY . .
RUN yarn install

RUN yarn build
RUN yarn add serve

EXPOSE 3000
CMD [ "yarn", "serve", "-s", "build", "-l", "3000"]
