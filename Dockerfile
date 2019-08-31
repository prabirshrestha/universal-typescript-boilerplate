FROM alpine:3.10.2

RUN apk add --update nodejs=10.16.3-r0 yarn=1.16.0-r0

RUN mkdir -p /app
WORKDIR  /app

ADD ./dist /app/dist
ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock

RUN yarn install

CMD ["node", "dist/server/main.js" ]

EXPOSE 3000
