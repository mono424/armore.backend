FROM ubuntu:18.04

ARG TLS_CERT=NONE
ARG TLS_KEY=NONE
RUN apt-get update && apt-get install -y \
  sudo \
  curl \
  gcc-arm-linux-gnueabi \
  qemu-user
RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN apt-get install -y nodejs
ENV NODE_ENV=production
ENV PORT=443
ENV TLS_CERT=${TLS_CERT}
ENV TLS_KEY=${TLS_KEY}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# RUN echo "${TLS_KEY}" >> ./cert/server.key
# RUN echo "${TLS_CERT}" >> ./cert/server.cert
EXPOSE 443
CMD [ "npm", "start" ]