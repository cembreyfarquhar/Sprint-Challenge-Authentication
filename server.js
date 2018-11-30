/*
Implement the `register` and `login` functions 
inside `/config/routes.js`. Use JSON Web Tokens 
for authentication.

The migrations and a database with empty users is 
already included, your job is adding the 
authentication related code. If every is done 
correctly, visiting `/api/jokes` should return 
a list of jokes.

*/

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {
  // If you're moving onto the stretch problem you'll need to set this obj with the appropriate fields
  // ensure that your client's URL/Port can achieve a Handshake
  // then pass this object to the cors() function
};

server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
  server,
};
