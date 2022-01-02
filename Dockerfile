FROM node:12

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json /app/

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . /app

# Run app
CMD node src/app.js --bind 0.0.0.0:$PORT
