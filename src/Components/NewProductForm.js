import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlant } from '../store';

const NewProductForm = () => {
	const dispatch = useDispatch();

	const [details, setDetails] = useState({
		name: '',
		lightRequirements: '',
		waterRequirements: '',
		price: 0,
		difficulty: 1,
		petFriendly: false,
		imageURL: '',
	});
	const [error, setError] = useState({});

	const save = async (e) => {
		e.preventDefault();
		try {
			await dispatch(createPlant(details));
			setDetails({
				name: '',
				lightRequirements: '',
				waterRequirements: '',
				price: 0,
				difficulty: 1,
				petFriendly: false,
				imageURL: '',
			});
			setError({});
		} catch (err) {
			setError(err.response.data);
		}
	};

	let errorMessages = [];

	if (error.errors) {
		errorMessages = error.errors.map((err) => err.message);
	}

	return (
		<form onSubmit={save} className="NewProductForm">
			<h2>Add a product:</h2>
			<label htmlFor="name">Name:</label>
			<input
				id="name"
				name="name"
				value={details.name}
				onChange={(e) => setDetails({ ...details, name: e.target.value })}
			/>
			<label htmlFor="light-requirements">Light Requirements:</label>
			<select
				name="light requirements"
				id="light-requirements"
				value={details.lightRequirements}
				onChange={(e) =>
					setDetails({ ...details, lightRequirements: e.target.value })
				}
			>
				<option value="low or indirect bright light">
					low or indirect bright light
				</option>
				<option value="indirect bright light">indirect bright light</option>
				<option value="direct bright light">direct bright light</option>
			</select>
			<label htmlFor="water-requirements">Water Requirements:</label>
			<select
				name="water requirements"
				id="water-requirements"
				value={details.waterRequirements}
				onChange={(e) =>
					setDetails({ ...details, waterRequirements: e.target.value })
				}
			>
				<option value="weekly">weekly</option>
				<option value="biweekly">biweekly</option>
				<option value="monthly">monthly</option>
			</select>

			<label htmlFor="price">Price:</label>
			<input
				min="0"
				step="0.01"
				type="number"
				id="price"
				name="price"
				value={details.price}
				onChange={(e) => setDetails({ ...details, price: e.target.value })}
			/>
			<label htmlFor="difficulty">Difficulty:</label>
			<input
				min="1"
				max="5"
				step="1"
				type="number"
				id="difficulty"
				name="difficulty"
				value={details.difficulty}
				onChange={(e) => setDetails({ ...details, difficulty: e.target.value })}
			/>
			<label htmlFor="pet-friendly">Pet Friedly:</label>
			<input
				id="pet-friendly"
				name="pet friendly"
				value={details.petFriendly}
				onChange={(e) =>
					setDetails({ ...details, petFriendly: e.target.value })
				}
			/>
			<label htmlFor="imageURL">Image URL:</label>
			<input
				id="imageURL"
				name="image URL"
				value={details.imageURL}
				onChange={(e) => setDetails({ ...details, imageURL: e.target.value })}
			/>
			<button className="button button-large">Create</button>
			{errorMessages.length ? (
				<div className="NewProductForm-error">
					<span>
						Your new product could not be created. Please address these errors:
					</span>
					<ul>
						{errorMessages.map((msg) => (
							<li key={msg}>{msg}</li>
						))}
					</ul>
				</div>
			) : null}
		</form>
	);
};

export default NewProductForm;
