// BUILD YOUR SERVER HERE
const User = require("./users/model.js");
const express = require("express");
const server = express();
server.use(express.json());

// | GET    | /api/users     | Returns an array
server.get("/api/users", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET    | /api/users/:id | Returns the user object with the specified `id`.

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST   | /api/users     | Creates a user using the information sent inside the `request body`.
server.post("/api/users", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({ message: "must include name and bio" });
  } else {
    try {
      const newUser = await User.insert(user);
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
