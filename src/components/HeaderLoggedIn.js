import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

function HeaderLoggedIn() {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);
	const handleLogout = () => {
		appDispatch({ type: 'logout' });
		appDispatch({
			type: 'flashMessage',
			value: 'You have successfully logged out',
		});
	};

	return (
		<div className="flex-row my-3 my-md-0">
			<Link href="/" className="text-white mr-2 header-search-icon">
				<i className="fas fa-search"></i>
			</Link>
			<span className="mr-2 header-chat-icon text-white">
				<i className="fas fa-comment"></i>
				<span className="chat-count-badge text-white"> </span>
			</span>
			<Link href="/" className="mr-2">
				<img className="small-header-avatar" src={appState.user.avatar} alt="avatar" />
			</Link>
			<Link className="btn btn-sm btn-success mr-2" to="/create-post">
				Create Post
			</Link>
			<button onClick={handleLogout} className="btn btn-sm btn-secondary">
				Sign Out
			</button>
		</div>
	);
}

export default HeaderLoggedIn;
