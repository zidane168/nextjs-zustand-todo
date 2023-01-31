FROM node:16-alpine
WORKDIR /client
COPY ./client /client 
 

RUN npm i 
RUN npm run build 

EXPOSE 3000
CMD ["npm", "start"]