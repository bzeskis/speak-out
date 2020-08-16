import React, { useEffect, useContext, useState } from 'react';
import Page from './Page';
import Axios from 'axios';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import StateContext from '../StateContext';
import ProfilePosts from './ProfilePosts';
import { useImmer } from 'use-immer';
import ProfileFollow from './ProfileFollow';
import NotFound from './NotFound';

function Profile() {
	const { username } = useParams();
	const appState = useContext(StateContext);
	const [state, setState] = useImmer({
		followActionLoading: false,
		startFollowingRequestCount: 0,
		stopFollowingRequestCount: 0,
		profileNotFound: false,
		profileData: {
			profileUsername: '',
			profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
			isFollowing: false,
			counts: { postCount: '', followerCount: '', followingCount: '' },
		},
	});

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source();

		const fetchData = async () => {
			try {
				if (!username) return;
				const response = await Axios.post(
					`/profile/${username}`,
					{
						token: appState.user.token,
					},
					{
						cancelToken: ourRequest.token,
					}
				);
				if (response.data) {
					setState(draft => {
						draft.profileData = response.data;
					});
				} else {
					setState(draft => {
						draft.profileNotFound = true;
					});
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
		return () => {
			ourRequest.cancel();
		};
	}, [username]);

	const startFollowing = () => {
		setState(draft => {
			draft.startFollowingRequestCount++;
		});
	};

	const stopFollowing = () => {
		setState(draft => {
			draft.stopFollowingRequestCount++;
		});
	};

	useEffect(() => {
		if (state.startFollowingRequestCount) {
			setState(draft => {
				draft.followActionLoading = true;
			});
			const ourRequest = Axios.CancelToken.source();

			const fetchData = async () => {
				try {
					await Axios.post(
						`/addFollow/${state.profileData.profileUsername}`,
						{
							token: appState.user.token,
						},
						{
							cancelToken: ourRequest.token,
						}
					);
					setState(draft => {
						draft.profileData.isFollowing = true;
						draft.profileData.counts.followerCount++;
						draft.followActionLoading = false;
					});
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
			return () => {
				ourRequest.cancel();
			};
		}
	}, [state.startFollowingRequestCount]);

	useEffect(() => {
		if (state.stopFollowingRequestCount) {
			setState(draft => {
				draft.followActionLoading = true;
			});
			const ourRequest = Axios.CancelToken.source();

			const fetchData = async () => {
				try {
					await Axios.post(
						`/removeFollow/${state.profileData.profileUsername}`,
						{
							token: appState.user.token,
						},
						{
							cancelToken: ourRequest.token,
						}
					);
					setState(draft => {
						draft.profileData.isFollowing = false;
						draft.profileData.counts.followerCount--;
						draft.followActionLoading = false;
					});
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
			return () => {
				ourRequest.cancel();
			};
		}
	}, [state.stopFollowingRequestCount]);

	if (state.profileNotFound) {
		return <NotFound />;
	}

	return (
		<Page title="Profile Screen">
			<h2>
				<img className="avatar-small" src={state.profileData.profileAvatar} alt="avatar" />{' '}
				{state.profileData.profileUsername}
				{appState.loggedIn &&
					!state.profileData.isFollowing &&
					appState.user.username !== state.profileData.profileUsername &&
					state.profileData.profileUsername !== '...' && (
						<button
							onClick={startFollowing}
							disabled={state.followActionLoading}
							className="btn btn-primary btn-sm ml-2"
						>
							Follow <i className="fas fa-user-plus"></i>
						</button>
					)}
				{appState.loggedIn &&
					state.profileData.isFollowing &&
					appState.user.username !== state.profileData.profileUsername &&
					state.profileData.profileUsername !== '...' && (
						<button onClick={stopFollowing} disabled={state.followActionLoading} className="btn btn-danger btn-sm ml-2">
							Stop Following <i className="fas fa-user-times"></i>
						</button>
					)}
			</h2>

			<div className="profile-nav nav nav-tabs pt-2 mb-4">
				<NavLink exact to={`/profile/${state.profileData.profileUsername}`} className="nav-item nav-link">
					Posts: {state.profileData.counts.postCount}
				</NavLink>
				<NavLink to={`/profile/${state.profileData.profileUsername}/followers`} className="nav-item nav-link">
					Followers: {state.profileData.counts.followerCount}
				</NavLink>
				<NavLink to={`/profile/${state.profileData.profileUsername}/following`} className="nav-item nav-link">
					Following: {state.profileData.counts.followingCount}
				</NavLink>
			</div>

			<Switch>
				<Route exact path="/profile/:username">
					<ProfilePosts />
				</Route>
				<Route path="/profile/:username/followers">
					<ProfileFollow action="followers" />
				</Route>
				<Route path="/profile/:username/following">
					<ProfileFollow action="following" />
				</Route>
			</Switch>
		</Page>
	);
}

export default Profile;
