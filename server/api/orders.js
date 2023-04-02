const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { Order } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll();
		const orders = await Order.findAll();
		res.send(orders);
		res.send(users);
	} catch (ex) {
		next(ex);
	}
});

app.post('/', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.send(await user.createOrder());
	} catch (ex) {
		next(ex);
	}
});

app.get('/cart', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.send(await user.getCart());
	} catch (ex) {
		next(ex);
	}
});

app.post('/cart', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.send(await user.addToCart(req.body));
	} catch (ex) {
		next(ex);
	}
});

app.put('/cart', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.send(await user.removeFromCart(req.body));
	} catch (ex) {
		next(ex);
	}
});
