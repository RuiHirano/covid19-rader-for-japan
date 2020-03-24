FROM node:10

# install dependencies
RUN mkdir -p /home/guest/covid19-rader-for-japan/frontend
WORKDIR /home/guest/covid19-rader-for-japan/frontend

COPY . .
RUN yarn install

EXPOSE 3000
CMD [ "yarn", "start"]
