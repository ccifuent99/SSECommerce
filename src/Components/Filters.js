import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlants, incrementCart } from '../store';

//to host all functional 'cards' ** base framework

const Filters = ({ filters, updateFilters }) => {
	const updateCheckbox = (option) => {
		const updatedFilters = { ...filters };
		updatedFilters[option] = !filters[option];
		updateFilters(updatedFilters);
	};

	const updateCheckboxCategory = (categoryName, option) => {
		const updatedFilters = { ...filters };
		const category = updatedFilters[categoryName];
		const index = category.indexOf(option);
		index === -1 ? category.push(option) : category.splice(index, 1);
		updatedFilters[categoryName] = category;
		updateFilters(updatedFilters);
	};

	const waterRequirementOptions = ['Weekly', 'Biweekly', 'Monthly'];
	const lightRequirementOptions = [
		'Low or indirect bright light',
		'Indirect bright light',
		'Direct bright light',
	];
	const difficultyOptions = ['1', '2', '3', '4', '5'];

	return (
		<div className="filters">
			<div className="checkboxContainer">
				<input
					onChange={(e) => {
						updateCheckbox('petFriendly');
					}}
					type="checkbox"
					id="petFriendlyFilter"
				></input>
				<label htmlFor="petFriendlyFilter" className="checkboxText">
					Pet Friendly
				</label>
			</div>
			<div className="filterTitle">Water Requirements </div>
			<div>
				{waterRequirementOptions.map((option) => {
					return (
						<div className="checkboxContainer" key={option}>
							<input
								onChange={(e) => {
									updateCheckboxCategory('waterRequirements', option);
								}}
								type="checkbox"
								id={option}
							></input>
							<label htmlFor={option} className="checkboxText">
								{option}
							</label>
						</div>
					);
				})}
			</div>

			<div className="filterTitle">
				Light Requirements
				<img />
			</div>
			<div>
				{lightRequirementOptions.map((option) => {
					return (
						<div className="checkboxContainer" key={option}>
							<input
								onChange={(e) => {
									updateCheckboxCategory('lightRequirements', option);
								}}
								type="checkbox"
								id={option}
							></input>
							<label htmlFor={option} className="checkboxText">
								{option}
							</label>
						</div>
					);
				})}
			</div>

			<div className="filterTitle">Difficulty</div>
			<div>
				{difficultyOptions.map((option) => {
					return (
						<div className="checkboxContainer" key={option}>
							<input
								onChange={(e) => {
									updateCheckboxCategory('difficulty', option);
								}}
								type="checkbox"
								id={option}
							></input>
							<label htmlFor={option} className="checkboxText">
								{option}
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Filters;
