FROM fibo:fibo-v1

RUN sudo apt-get update
RUN apk add -no-cache mysql-server nodejs npm
RUN sudo service mysql start

WORKDIR /app
COPY /dist /server /app/

RUN cd server && npm install

EXPOSE 8080 8081

ENTRYPOINT [ "node" ]
CMD [ "./server/index.js" ]
