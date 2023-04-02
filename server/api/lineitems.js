const express = require("express");
const app = express.Router();
const { LineItem } = require("../db");

app.get("/", async (req, res, next) => {
    try {
      const lineitems = await LineItem.findAll();
      res.send(lineitems);
    } catch (ex) {
      next(ex);
    }
  });

  module.exports = app;