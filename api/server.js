// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();
server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json({ users });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    try {
      const user = await Users.update(id, changes);
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "The user information could not be modified" });
    }
  }
});

server.post("/api/users", async (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    try {
      const fullNewUser = await Users.insert(newUser);
      res.status(201).json(fullNewUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    }
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.remove(id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "The user could not be removed" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
