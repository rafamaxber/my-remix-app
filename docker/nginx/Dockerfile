# base node image
FROM node:20-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install nginx
RUN apt-get update && apt-get install -y nginx

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package*.json ./
RUN npm install --include=dev

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package*.json ./
RUN npm prune --omit=dev

# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV PORT="3000"
ENV NODE_ENV="production"

WORKDIR /myapp

RUN rm -rf /etc/nginx

COPY --from=production-deps /myapp/node_modules /myapp/node_modules

COPY --from=build /myapp/config/nginx/ /etc/nginx/
COPY --from=build /myapp/pm2/ /myapp/pm2/
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json
COPY --from=build /myapp/start.sh /myapp/start.sh

EXPOSE 3000
EXPOSE 80

RUN npm i -g pm2

ENTRYPOINT [ "./start.sh" ]
