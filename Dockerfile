FROM node:16-alpine
# FROM alpine:3.6

# set the default NODE_ENV to production
# for dev/test build with: docker build --build-arg NODE=development .
# and the testing npms will be included
ARG NODE=development
ENV NODE_ENV ${NODE}
RUN mkdir /app && chown -R node:node /app
# copy package info early to install npms and delete npm command
WORKDIR /app
USER node

COPY --chown=node:node package.json package-lock*.json ./

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD [ "npm", "start" ]
# ENTRYPOINT ["bash","/usr/src/app/startup.sh"]