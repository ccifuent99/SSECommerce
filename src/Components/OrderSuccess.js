import React, { useEffect } from 'react';
import { createOrder } from '../store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const OrderSuccess = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(createOrder(navigate));
	}, []);

	return <div>Thanks for your order!</div>;
};

export default OrderSuccess;
