FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set environment variable
ENV NODE_ENV production

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn --network-timeout 1000000 --pure-lockfile && yarn --network-timeout 1000000 cache clean

# Bundle app source
COPY . /usr/src/app

# Port
EXPOSE 3000

# Start
CMD [ "yarn", "start" ]
