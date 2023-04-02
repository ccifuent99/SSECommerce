import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { account } from '../store';
import { createUser } from '../store/users.js';

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		username: '',
		password: '',
		firstName: '',
		lastName: '',
	});
	const onChange = (ev) => {
		setUserInfo({ ...userInfo, [ev.target.name]: ev.target.value });
	};

	const register = (ev) => {
		ev.preventDefault();
		dispatch(createUser(userInfo));
		navigate('/login');
	};
	return (
		<div className="registerBody">
			<div className="loginContainer ">
				<div>
					<h2 className="centered">Create your account</h2>
					<form onSubmit={register}>
						<label htmlFor="firstName">Last name</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={userInfo.firstName}
							onChange={onChange}
						/>

						<label htmlFor="lastName">First name</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={userInfo.lastName}
							onChange={onChange}
						/>

						<label htmlFor="username">Username</label>
						<input
							id="username"
							// placeholder="username"
							name="username"
							value={userInfo.username}
							onChange={onChange}
						/>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							// placeholder="password"
							name="password"
							value={userInfo.password}
							onChange={onChange}
						/>
						<button className="button button-large">Create account</button>
					</form>
					<div className="centered">
						<span>Already have an account? </span>
						<span className="button-link" onClick={() => navigate('/login')}>
							Sign in
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
