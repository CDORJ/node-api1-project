// BUILD YOUR SERVER HERE
const express = require("express");
const users = require("./users/model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "The server is up and running successfully." });
});

server.get("/api/users", async (req, res) => {
  const listOfUsers = await users.find();
  if (listOfUsers.length < 1) {
    res.status(200).json({ message: "There are no users in the database." });
  } else {
    res.status(200).json(listOfUsers);
  }
});

server.post("/api/users", async (req, res) => {
  const newUserDetails = req.body;

  if (!newUserDetails.name || !newUserDetails.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    const newUser = await users.insert(newUserDetails);
    res.status(201).json(newUser);
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const specificUser = await users.findById(id);

  if (specificUser === undefined) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  } else {
    res.status(200).json(specificUser);
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await users.remove(id);

  if (deletedUser === null) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  } else {
    res.status(200).json(deletedUser);
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  
  try {
    const updatedUser = await users.update(id, changes);
    if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else if (!updatedUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
