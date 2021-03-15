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

/* server.put("/api/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = req.body;
  try {
    const updatedDog = await Dog.update(id, dog);
    if (updatedDog) {
      res.json(updatedDog);
    } else {
      res.status(404).json({ messsage: "bad id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}); */

module.exports = server; // EXPORT YOUR SERVER instead of {}
