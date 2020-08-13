import React, { useState, useContext } from 'react';
import Axios from 'axios';
import DispatchContext from '../DispatchContext';

function HeaderLoggedOut() {
	const appDispatch = useContext(DispatchContext);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [emptyUsername, setEmptyUsername] = useState(false);
	const [emptyPassword, setEmptyPassword] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			if (username && password) {
				const res = await Axios.post('/login', {
					username,
					password,
				});
				if (res.data) {
					appDispatch({ type: 'login', data: res.data });
					appDispatch({
						type: 'flashMessage',
						value: 'You have successfully logged in.',
					});
				} else {
					appDispatch({
						type: 'flashMessage',
						value: {
							text: 'Invalid username / password',
							class: 'danger',
						},
					});
				}
			} else {
				!username ? setEmptyUsername(true) : setEmptyUsername(false);
				!password ? setEmptyPassword(true) : setEmptyPassword(false);
				appDispatch({
					type: 'flashMessage',
					value: {
						text: 'Please enter your username / password',
						class: 'danger',
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
			<div className="row align-items-center">
				<div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
					<input
						name="username"
						className={`form-control form-control-sm input-dark ${emptyUsername ? 'is-invalid' : ''}`}
						type="text"
						placeholder="Username"
						autoComplete="off"
						onChange={e => {
							setUsername(e.target.value);
							setEmptyUsername(false);
						}}
					/>
				</div>
				<div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
					<input
						name="password"
						className={`form-control form-control-sm input-dark ${emptyPassword ? 'is-invalid' : ''}`}
						type="password"
						placeholder="Password"
						onChange={e => {
							setPassword(e.target.value);
							setEmptyPassword(false);
						}}
					/>
				</div>
				<div className="col-md-auto">
					<button className="btn btn-success btn-sm">Sign In</button>
				</div>
			</div>
		</form>
	);
}

export default HeaderLoggedOut;
