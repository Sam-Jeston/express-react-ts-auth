FROM node:8.2.1

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64.deb
RUN dpkg -i dumb-init_*.deb

RUN mkdir /server
RUN mkdir /client

# Cache node modules
COPY ./server/package.json ./server/package.json
COPY ./client/package.json ./client/package.json

COPY ./server/pm2.json ./server/pm2.json

RUN cd server && npm install --production
RUN cd client && npm install

# Copy only production code
COPY ./server/src/ ./server/src/
COPY ./server/migrations/ ./server/migrations/
COPY ./server/tsconfig.json ./server/tsconfig.json
COPY ./client/src/ ./client/src/
COPY ./client/public/ ./client/public/
COPY ./client/tsconfig.json ./client/tsconfig.json
COPY ./client/webpack.config.js ./client/webpack.config.js
COPY ./client/index.html ./client/index.html

COPY tslint.json .
COPY package.json .

RUN cd server && npm run compile
RUN cd server && rm -rf src
RUN cd client && npm run compile
RUN cd client && rm -rf src

CMD ["dumb-init", "pm2-docker", "start", "pm2.json"]
