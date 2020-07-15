FROM node:12.18.2

COPY views /views
COPY bin /app/bin
COPY routes /app/routes 
COPY package.json /app/
COPY app.js /app/

RUN cd /app; npm install

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR "/app"
CMD [ "npm", "start" ]