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

server.post("/api/users", async (req, res) => {
  const newUserDetails = req.body;

  if (!newUserDetails.name || !newUserDetails.bio) {
    res.status(400).send({ message: "Invalid user. Name and Bio required." });
  } else {
    const newUser = await users.insert(newUserDetails);
    res.status(200).send(newUser);
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const specificUser = await users.findById(id);

  if (specificUser === undefined) {
    res.status(404).send({ message: "Invalid ID. User not found." });
  } else {
    res.status(200).send(specificUser);
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await users.remove(id);

  if (deletedUser === null) {
    res.status(404).send({ message: `Invalid ID. User not found.` });
  } else {
    res.status(200).send({
      message: `${deletedUser.name} has been successfully removed from the database.`,
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
