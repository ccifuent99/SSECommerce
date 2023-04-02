const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./api/auth"));
app.use("/api/auth/isadmin", require("./api/auth"));
app.use("/api/orders", require("./api/orders"));
app.use("/api/lineitems", require("./api/lineitems"));
app.use("/api/products", require("./api/products"));
app.use("/api/register", require("./api/register"));
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.lineItems.map((li) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: li.product.name,
          },
          unit_amount_decimal: li.product.price * 100,
        },
        quantity: li.quantity,
      };
    }),
    mode: "payment",
    success_url: `${req.protocol}://${req.hostname}:${
      process.env.PORT || 3000
    }/#/order-success`,
    cancel_url: `${req.protocol}://${req.hostname}:${
      process.env.PORT || 3000
    }/#/cart?canceled=true`,
  });

  res.send(session.url);
});

app.use((err, req, res, next) => {
  if (err.message && !err.errors) {
    res.status(err.status || 500).send({ error: err.message });
  } else {
    res.status(err.status || 500).send(err.errors);
  }
});

module.exports = app;
