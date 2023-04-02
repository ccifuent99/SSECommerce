import axios from 'axios';

const plants = (state = [], action) => {
	if (action.type === 'SET_PLANTS') {
		return action.plants;
	}

	if (action.type === 'UPDATE_PLANT') {
		return state.map((plant) =>
			plant.id === action.plant.id ? action.plant : plant
		);
	}

	if (action.type === 'CREATE_PLANT') {
		return [...state, action.plant];
	}

	return state;
};

//thunk

export const fetchPlants = () => {
	return async (dispatch) => {
		const response = await axios.get('/api/products');
		dispatch({ type: 'SET_PLANTS', plants: response.data });
	};
};

export const updatePlant = (product) => {
	return async (dispatch) => {
		const response = await axios.put(`/api/products/${product.id}`, product);
		dispatch({ type: 'UPDATE_PLANT', plant: response.data });
	};
};

export const createPlant = (product) => {
	return async (dispatch) => {
		const response = await axios.post('/api/products', product);
		dispatch({ type: 'CREATE_PLANT', plant: response.data });
	};
};

export default plants;
