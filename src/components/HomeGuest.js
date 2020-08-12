import React, { useState } from 'react';
import Page from './Page';
import Axios from 'axios';

function HomeGuest() {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await Axios.post('http://localhost:8080/register', { username, email, password });
			console.log('User created.');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Page title="Home" wide={true}>
			<div className="row align-items-center">
				<div className="col-lg-7 py-3 py-md-5">
					<h1 className="display-3">Join the conversation</h1>
					<p className="lead text-muted">
						Do you feel that you have great ideas and thoughts to share with the world? SpeakOut is the go-to platform
						for spreading your word as easily as possible. Join now and be heard.
					</p>
				</div>
				<div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="username-register" className="text-muted mb-1">
								<small>Username</small>
							</label>
							<input
								id="username-register"
								name="username"
								className="form-control"
								type="text"
								placeholder="Pick a username"
								autoComplete="off"
								onChange={e => setUsername(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email-register" className="text-muted mb-1">
								<small>Email</small>
							</label>
							<input
								id="email-register"
								name="email"
								className="form-control"
								type="text"
								placeholder="you@example.com"
								autoComplete="off"
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password-register" className="text-muted mb-1">
								<small>Password</small>
							</label>
							<input
								id="password-register"
								name="password"
								className="form-control"
								type="password"
								placeholder="Create a password"
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
							Sign up for SpeakOut
						</button>
					</form>
				</div>
			</div>
		</Page>
	);
}

export default HomeGuest;
