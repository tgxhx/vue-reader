FROM mhart/alpine-node:10.15.3

RUN mkdir /app
WORKDIR /app

COPY config /app/config
COPY server /app/server
COPY views /app/views
COPY ecosystem.config.json  /app

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install pm2 -g

EXPOSE 8082

CMD ["pm2-runtime", "start", "ecosystem.config.json"]
