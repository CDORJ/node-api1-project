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
    res.status(500).json({ error: err });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "bad id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

server.put("/api/users", async (req, res) => {
  const newUser = req.body;

  try {
    await Users.insert(newUser);
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.remove(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "bad id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
