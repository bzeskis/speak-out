import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import LoadingDotsIcon from './LoadingDotsIcon';

function ProfileFollow(props) {
	const { username } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source();
		const fetchPosts = async () => {
			try {
				const response = await Axios.get(`/profile/${username}/${props.action}`, {
					cancelToken: ourRequest.token,
				});
				setPosts(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPosts();
		return () => {
			ourRequest.cancel();
		};
	}, [username, props.action]);

	if (isLoading)
		return (
			<div className="">
				{' '}
				<LoadingDotsIcon />
			</div>
		);
	return (
		<div className="list-group">
			{posts.map((user, index) => {
				return (
					<Link key={index} to={`/profile/${user.username}`} className="list-group-item list-group-item-action">
						<img className="avatar-tiny" src={user.avatar} alt="avatar" /> {user.username}
					</Link>
				);
			})}
		</div>
	);
}

export default ProfileFollow;
