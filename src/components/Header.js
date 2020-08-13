import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderLoggedIn from './HeaderLoggedIn';
import StateContext from '../StateContext';

const Header = () => {
	const appState = useContext(StateContext);
	return (
		<header className="linear-blue mb-3">
			<div className="container d-flex flex-column flex-md-row align-items-center p-3">
				<h4 className="my-0 mr-md-auto font-weight-normal">
					<Link to="/" className="logo text-white">
						SpeakOut
					</Link>
				</h4>
				{appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
			</div>
		</header>
	);
};

export default Header;
