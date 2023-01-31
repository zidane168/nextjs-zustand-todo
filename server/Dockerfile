FROM node:16-alpine
WORKDIR /server
COPY ./server /server

RUN npm i
RUN npm run build

EXPOSE 8000
CMD ["npm", "start"]