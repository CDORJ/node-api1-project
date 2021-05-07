// BUILD YOUR SERVER HERE
const express = require("express");
const users = require("./users/model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "The server is up and running successfully." });
});

server.get("/api/users", async (req, res) => {
  const listOfUsers = await users.find();
  if (listOfUsers.length < 1) {
    res.status(200).send({ message: "There are no users in the database." });
  } else {
    res.status(200).send(listOfUsers);
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
