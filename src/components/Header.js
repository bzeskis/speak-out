import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="linear-blue mb-3">
			<div className="container d-flex flex-column flex-md-row align-items-center p-3">
				<h4 className="my-0 mr-md-auto font-weight-normal">
					<Link to="/" className="logo text-white">
						SpeakOut
					</Link>
				</h4>
				<div className="flex-row my-3 my-md-0">
					<a href="#" className="text-white mr-2 header-search-icon">
						<i className="fas fa-search"></i>
					</a>
					<span className="mr-2 header-chat-icon text-white">
						<i className="fas fa-comment"></i>
						<span className="chat-count-badge text-white"> </span>
					</span>
					<a href="#" className="mr-2">
						<img
							className="small-header-avatar"
							src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
						/>
					</a>
					<a className="btn btn-sm btn-success mr-2" href="/create-post">
						Create Post
					</a>
					<button className="btn btn-sm btn-secondary">Sign Out</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
