const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
app.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
    console.log(ex.message);
  }
});

app.post("/isadmin", async (req, res, next) => {
  try {
    res.send(await User.authenticateAsAdmin(req.body));
  } catch (ex) {
    console.log(ex.message);
    return res.status(400).send({ message: ex.message });
  }
});

app.get("/isadmin", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.isAdmin === true) {
      res.send(user);
    }
  } catch (ex) {
    return res.status(400).send({ message: "User is not Admin" });
  }
});
