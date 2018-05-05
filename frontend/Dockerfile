#Npm server
#FROM node:9.6.1
#RUN mkdir /frontend
#WORKDIR /frontend
#ADD .  /frontend/
#RUN npm install
#ENV NODE_ENV=production
#ENV PORT=5000

#Serve web server
FROM node:9.3.0-alpine
RUN npm install -g serve
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
