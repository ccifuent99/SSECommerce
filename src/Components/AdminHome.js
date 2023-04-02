import React, { useState } from 'react';
import ProductUpdate from './ProductUpdate';
import NewProductForm from './NewProductForm';

const AdminHome = () => {
	const [mode, setMode] = useState(null);

	return (
		<div className="AdminHome">
			<nav className="AdminHome-menu">
				<span className="button-link" onClick={() => setMode(null)}>
					Admin Home
				</span>
				<span className="button-link" onClick={() => setMode('updating')}>
					Update Products
				</span>
				<span className="button-link" onClick={() => setMode('adding')}>
					Add Products
				</span>
			</nav>

			{mode === null && (
				<div className="AdminHome-employee-intro">
					<div>Welcome to your Employee portal!</div>
					<div>
						Use the navigation items above to update or add product offerings to
						your database.
					</div>
				</div>
			)}

			{mode === 'updating' && <ProductUpdate />}
			{mode === 'adding' && <NewProductForm />}
		</div>
	);
};

export default AdminHome;
