import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlants } from '../store';
import ProductUpdateForm from './ProductUpdateForm';

const ProductUpdate = () => {
	const { plants } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);
	const [plant, setPlant] = useState('');

	useEffect(() => {
		dispatch(fetchPlants());
	}, []);

	useEffect(() => {
		setEditing(false);
	}, [plants]);

	const onChange = (e) => {
		setEditing(true);
		setPlant(e.target.value);
	};

	return (
		<div className="ProductUpdate">
			<div className="ProductUpdate-select">
				<h2>Select product to update:</h2>

				<select onChange={onChange}>
					<option>--Select product--</option>
					{plants.map((plant) => {
						return (
							<option key={plant.id} value={plant.name}>
								{plant.name}
							</option>
						);
					})}
				</select>
			</div>

			{editing && (
				<div className="ProductUpdate-form">
					<ProductUpdateForm plantName={plant} />{' '}
					<button
						className="ProductUpdate-close button button-large"
						onClick={() => setEditing(false)}
					>
						Close
					</button>
				</div>
			)}
		</div>
	);
};

export default ProductUpdate;
