import axios from 'axios';
const cart = (state = { lineItems: [] }, action) => {
	if (action.type === 'SET_CART') {
		return action.cart;
	}

	if (action.type === 'UPDATE_CART') {
		let lineItemIds = action.cart.lineItems.reduce((accum, elem) => {
			accum.push(elem.id);
			return accum;
		}, []);

		return {
			...state,
			lineItems: state.lineItems
				.filter((li) => {
					return lineItemIds.includes(li.id);
				})
				.map((li) => {
					let newLineItem = action.cart.lineItems.find(
						(lineItem) => lineItem.id === li.id
					);

					if (newLineItem.quantity === li.quantity) {
						return li;
					}

					return newLineItem;
				}),
		};
	}

	if (action.type === 'SET_LOCAL_CART') {
		window.localStorage.setItem('cart', JSON.stringify(action.cart));
		return action.cart;
	}

	window.localStorage.setItem('cart', JSON.stringify(state));

	return state;
};

export const fetchCart = () => {
	return async (dispatch) => {
		const token = window.localStorage.getItem('token');

		if (token) {
			const response = await axios.get('/api/orders/cart', {
				headers: {
					authorization: token,
				},
			});
			dispatch({ type: 'SET_CART', cart: response.data });
		}
	};
};

export const incrementCart = (product, quantity) => {
	return async (dispatch) => {
		const token = window.localStorage.getItem('token');

		if (token) {
			const response = await axios.post(
				'/api/orders/cart',
				{ product: product, quantity: quantity },
				{
					headers: { authorization: token },
				}
			);

			dispatch({ type: 'UPDATE_CART', cart: response.data });
		} else {
			let cart = JSON.parse(window.localStorage.getItem('cart'));

			let lineItem = cart.lineItems.find((lineItem) => {
				return lineItem.productId === product.id;
			});

			if (lineItem) {
				cart.lineItems = cart.lineItems.map((lineItem) => {
					if (lineItem.productId === product.id) {
						lineItem.quantity += quantity;
					}
					return lineItem;
				});
			} else {
				cart.lineItems.push({
					productId: product.id,
					product,
					quantity,
				});
			}

			dispatch({ type: 'SET_LOCAL_CART', cart });
		}
	};
};

export const decrementCart = (product, quantity) => {
	return async (dispatch) => {
		const token = window.localStorage.getItem('token');

		if (token) {
			const response = await axios.put(
				'/api/orders/cart',
				{ product: product, quantityToRemove: quantity },
				{
					headers: { authorization: token },
				}
			);

			dispatch({ type: 'UPDATE_CART', cart: response.data });
		} else {
			let cart = JSON.parse(window.localStorage.getItem('cart'));

			let lineItem = cart.lineItems.find((lineItem) => {
				return lineItem.productId === product.id;
			});

			if (lineItem.quantity === quantity) {
				cart.lineItems = cart.lineItems.filter(
					(lineItem) => lineItem.productId !== product.id
				);
			} else {
				cart.lineItems = cart.lineItems.map((lineItem) => {
					if (lineItem.productId === product.id) {
						lineItem.quantity -= quantity;
					}
					return lineItem;
				});
			}

			dispatch({ type: 'SET_LOCAL_CART', cart });
		}
	};
};

export const createOrder = (navigate) => {
	return async (dispatch) => {
		const token = window.localStorage.getItem('token');

		await axios.post(
			'/api/orders',
			{},
			{
				headers: { authorization: token },
			}
		);

		dispatch({ type: 'SET_CART', cart: { lineItems: [] } });

		if (token) navigate('/orders');
	};
};
export default cart;
