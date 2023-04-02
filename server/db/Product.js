const conn = require('./conn');
const { STRING, UUID, UUIDV4, INTEGER, BOOLEAN, DECIMAL, ENUM } =
	conn.Sequelize;

const Product = conn.define('product', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	name: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Product name cannot be empty',
			},
		},
	},
	lightRequirements: {
		type: ENUM(
			'low or indirect bright light',
			'indirect bright light',
			'direct bright light'
		),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Light requirements cannot be empty',
			},
			isIn: {
				args: [
					[
						'low or indirect bright light',
						'indirect bright light',
						'direct bright light',
					],
				],
				msg: 'Light requirements must be low or indirect bright light, indirect bright light, or direct bright light. If you wish to add a new product to the database with different light requirements, update the database.',
			},
		},
	},
	waterRequirements: {
		type: ENUM('weekly', 'biweekly', 'monthly'),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Water requirements cannot be empty',
			},
			isIn: {
				args: [['weekly', 'biweekly', 'monthly']],
				msg: 'Water requirements must be weekly, biweekly, or monthly. If you wish to add a new product to the database with different water requirements, update the database.',
			},
		},
	},
	price: {
		type: DECIMAL(10, 2),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Price cannot be empty',
			},
			isDecimal: {
				msg: 'Price must be listed as a decimal value (e.g., 5.00 or 4.99)',
			},
		},
	},
	difficulty: {
		type: INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter the difficulty of caring for this plant on a scale of 1 - 5',
			},
			isInt: {
				msg: 'Difficulty must be an integer between 1 - 5',
			},
			min: {
				args: 1,
				msg: '1 is the lowest possible difficulty rating',
			},
			max: {
				args: 5,
				msg: '5 is the highest possible difficulty rating',
			},
		},
	},
	petFriendly: {
		type: BOOLEAN,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	imageURL: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter the URL to an image of this product',
			},
			isUrl: {
				msg: 'Please enter a valid URL',
			},
		},
	},
});

module.exports = Product;
