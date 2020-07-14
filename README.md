# fibonacci numbers test task
 
This repo contains client and server. All calculations occur on the server-side and information about ip, number, result, and date is stored in MySQL DB.

The app is served by 2 ports. One for getting front-end (index.html) and another for REST api.

# Project configuration
## Server
1. For the server you need to create `.env` file in `./server` folder with the following configuration:<br>
`IP=ip_for_tests` - you can specify any valid api like 192.168.0.10 <br>
`FRONT_PORT=port_which_is_used_to_send_the_front-end` - when user comes to the web-site it sends **index.html** so we will specify this port in address line in browser <br>
`PORT=port_for_rest_api` - requests from the application comes to this port <br/>
`HOST=DB_host` - if DB is installed on machine where server runs then you can specify localhost, otherwise DB must allow to connect to itself via not localhost host <br>
`DATABASE=name_of_DB` - `fibonacci` for example <br>
`TABLE=name_of_table` - table which stores requests for calculation - `requests` for example <br>
`TEST_DATABASE=name_of_test_DB` - `test_fibonacci` for example <br>
`USER_NAME=name_of_mysql_db_user` - the user has to have rights to create, delete DB and tables and create and delete records<br>
`PASSWORD=mysql_user_password` <br>

:warning: **Your MySQL DB has to allow authentication with `mysql_native_password` but not with `caching_sha2_password`**

2. Open server folder in terminal and run `npm run install` for packages installation.
<br>

### CLI commands
To run tests open the server folder in terminal and use
```
npm run tests
```
\
To run the server in development mod open the server folder in terminal and use
```
npm run start
```
\
:warning: To run the server in production mode you have to have built client app in dist folder. So you have to open the repo root folder in terminal and use (notice that you have to do initial setup for client app before you build it)
```
npm run build
```
\
After you built the client go to the server folder in terminal and use
```
npm run prod
```
this will provide **index.html** on a port you specified in `.env` for the var `FRONT_PORT`. REST api is avaialbe on the port you specified in `.env` for the var `PORT`.
<br>
## **Client**
1. For the client you need to create `.env` file in root repo folder with the following configuration:<br>
`HOST=ip_where_front_is_served` - ip of machine where app runs (192.168.0.10 for expample) <br>
`PORT=port_for_the_app` - the app is reachable on this port (8080 for example). Don't specify port what is used for REST api by the server <br>
`DEV_HOST=ip_for_webpack_dev_server` - ip of machine where app runs by webpack (192.168.0.10 for expample) <br>
`DEV_PORT=port_for_the_app` - the app is reachable on this port (8080 for example). Don't specify port what is used for REST api by the server <br>
`DEV_SERVER_PORT=port_for_using_rest_api` - it's used by webpack for proxy (it has to be a port that server uses for REST api) <br>

2. Set `SERVER_IP` in `vars.config.js` in root repo folder as server REST api IP address (192.168.0.15:8081 for example).

3. Open root repo folder in terminal and run `npm run install` for packages installation.
<br>

### CLI commands
To start the app in dev mod use
```
npm run start
```
\
To build the app use
```
npm run build
```
\
To run tests use
```
npm run test
```
> Notice that DB has to contains 11 < records_for_the_ip_which_you_launch_tests_from < 13

<br>

To update shapshots use
```
npm run jest-update
```
