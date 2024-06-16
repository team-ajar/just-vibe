# Thesis: just-vibe Application

### just-vibe

> just-vibe is a application dedicated to the act of getting groovy made easy!

### Features

<li>Save album of the day
<li>Create a user profile
<li>Leave album reviews
<li>Keep up with concerts

### What frameworks/libraries are used

#### Tech Stack

<ins>_**Client:**_</ins> -> React (Hooks) & Axios\
<ins>
_**Server:**_</ins> -> Express\
<ins>
_**Database:**_ </ins>-> Mysql/Prisma\
<ins>
_**Authentication:**_</ins> -> Auth0 \
<ins>
_**Style:**_ </ins>-> Material UI

### What software is required to run

> NPM was used to installed the necessary dependencies for this project.

<li> NPM
<li> Node 22

> The Database was built using MySql and the Prisma ORM.

<li> MySql
<li> Prisma

> The Client side was created with React hooks

<li> @types/React
<li> @types/React-router
<li> @types/React-dom
<li> @types/React-router-dom

> Axios was used to communicate with the Server from our Client side.

<li> Axios

> Express on the Server side to handle all request handling

<li> @types/Express

> For errors and specific syntax rules we utilized ESLint with Airbnb rules.

<li> @types_jsESLint (Airbnb Rules)

> Transpiling was performed from Babel plugins to create compatible code for older browsers.

<li>@babel/core
<li>@babel/preset-env
<li>@babel/preset-react
<li>babel-loader

> Bundling for optimization performed by Webpack

<li> Webpack
<li> Webpack-cli

> Styling created using Material UI and emotion

<li>mui/material

> Lastly for Authentication was performed with the use of Auth0

<li> Auth0

### What commands to use to Start

1: **Start MySql** server/service\
<ins>MAC - Homebrew</ins>\
mysql.server start

<ins>Windows/WSL</ins>\
sudo service mysql start

2: **npm start**: Start the server utilizing _Nodemon_ (1 terminal sustained)

3: **npm run build**: Start the transpiling & bundling process and continuously runs while developing until stopped. (1 Terminal sustained)

4: **mysql -uroot** -> **create database justvibe**: Create a local justvibe database to store data.

6: **Restart server** so the database can accept the seed data

### Closing

> We would like to continue working on what we have initially created in order to learn more and grow experiences!

### Authors & acknowledgements:

'Rodman L. Arina N. Allyn M.'
