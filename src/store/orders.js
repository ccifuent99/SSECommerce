import axios from 'axios';

const orders = (state = [], action) => {
	if (action.type === 'GET_ORDERS') {
		return action.orders;
	}
	return state;
};

export const getOrders = (orders) => {
	return async (dispatch) => {
		const response = await axios.get(`/api/orders`);
		dispatch({ type: 'GET_ORDERS', orders: response.data });
	};
};

export default orders;
