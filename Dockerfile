FROM ubuntu:18.04
RUN apt-get update && apt-get install -y \
  sudo \
  curl \
  gcc-arm-linux-gnueabi \
  qemu-user
RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN apt-get install -y nodejs
ENV PORT=443
ENV TLS_CERT=${TLS_CERT}
ENV TLS_KEY=${TLS_KEY}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 443
CMD [ "npm", "start" ]