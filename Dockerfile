FROM node:12.18.2

ADD views /views
ADD package.json /app
ADD app.js /app

RUN cd /app; npm install

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR "/app"
CMD [ "npm", "start" ]