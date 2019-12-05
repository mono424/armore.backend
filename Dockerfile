FROM ubuntu:18.04
RUN apt-get update && apt-get install -y \
  sudo \
  curl \
  gcc-arm-linux-gnueabi \
  qemu-user
RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN apt-get install -y nodejs
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]