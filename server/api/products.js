const express = require('express');
const app = express.Router();
const { Product } = require('../db');

app.get('/', async (req, res, next) => {
	try {
		const plants = await Product.findAll();
		res.send(plants);
	} catch (ex) {
		next(ex);
	}
});

app.post('/', async (req, res, next) => {
	try {
		res.status(201).send(await Product.create(req.body));
	} catch (err) {
		next(err);
	}
});

app.get('/:id', async (req, res, next) => {
	try {
		const plant = await Product.findByPk(req.params.id);
		res.send(plant);
	} catch (ex) {
		next(ex);
	}
});

app.put('/:id', (req, res, next) => {
	Product.findByPk(req.params.id)
		.then((product) => product.update(req.body))
		.then((product) => res.send(product))
		.catch(next);
});

module.exports = app;
