FROM node:16

WORKDIR /src
COPY ./package.json /src
RUN npm i --production
COPY ./main.js /src
COPY ./utils /src/utils
COPY settings.js /src
RUN chown node:node /src
USER node

CMD ["node", "main.js"]
