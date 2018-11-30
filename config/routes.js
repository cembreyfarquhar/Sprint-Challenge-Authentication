const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig.js");

const { authenticate, getToken } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 4);

  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json(err));
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        res.status(201).json({ toke: getToken(user) });
        // res.status(201).json({ message: "logged in! ", authenticate });
      } else {
        res.status(401).json({ message: "ENTRY DENIED " });
      }
    });
}

function getJokes(req, res) {
  axios
    .get(
      "https://safe-falls-22549.herokuapp.com/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
