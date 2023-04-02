import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	});

	const onChange = (ev) => {
		setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
	};

	const login = (ev) => {
		ev.preventDefault();
		dispatch(attemptLogin(credentials));
		navigate('/');
	};
	return (
		<div className="loginBody">
			<div className="loginContainer ">
				<div>
					<h2 className="centered">Sign in to your account</h2>
					<form onSubmit={login}>
						<label htmlFor="username">Username</label>
						<input
							id="username"
							// placeholder="username"
							value={credentials.username}
							name="username"
							onChange={onChange}
						/>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							// placeholder="password"
							name="password"
							value={credentials.password}
							onChange={onChange}
						/>
						<button className="button button-large">Login</button>
					</form>
					<div className="centered">
						<span>Don't have an account? </span>
						<span
							className="button-link"
							onClick={() => navigate('/CreateAccount')}
						>
							Sign up
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
