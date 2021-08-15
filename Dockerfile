FROM node:lts-buster-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE 3000

USER root

RUN npm install nodemon -g
RUN mkdir /app && mkdir /downloads && mkdir /generated && mkdir /templates

WORKDIR /templates
COPY ./templates .

WORKDIR /app

COPY package.json ./
RUN npm install --silent 

# check every 30s to ensure this service returns HTTP 200
# HEALTHCHECK --interval=30s CMD node healthcheck.js

COPY ./app .

# COPY docker-entrypoint.sh /usr/local/bin/
# ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "npm", "start" ]
