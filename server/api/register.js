const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res, next) => {
  try {
    const newAccount = await User.create(req.body);
    res.send(newAccount);
  } catch (ex) {
    next(ex);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

app.put("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    await user.update(req.body);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
