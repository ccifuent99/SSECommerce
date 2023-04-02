import axios from 'axios';

const users = (state = [], action) => {
	if (action.type === 'USER_REGISTER') {
		return [...state, action.account];
	}

	return state;
};

export const createUser = (account) => {
	return async (dispatch) => {
		const response = await axios.post('/api/register', account);
		dispatch({ type: 'USER_REGISTER', account: response.data });
	};
};

export default users;
