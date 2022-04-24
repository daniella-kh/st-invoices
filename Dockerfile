FROM node:14 AS builder
ARG AUTH_TOKEN
WORKDIR /usr/src/app
COPY package.json .
RUN echo "//npm.pkg.github.com/:_authToken=${AUTH_TOKEN}" > .npmrc && \
    echo "@elementor:registry=https://npm.pkg.github.com/" >> .npmrc && \
    npm install && \
    rm -f .npmrc



FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules
COPY . .
USER node

HEALTHCHECK CMD healthcheck

CMD [ "npm", "start" ]
