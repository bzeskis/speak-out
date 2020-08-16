import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import './App.css';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

import Header from './components/Header';
import Home from './components/Home';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import FlashMessages from './components/FlashMessages';
import Profile from './components/Profile';
import EditPost from './components/EditPost';
import NotFound from './components/NotFound';
import LoadingDotsIcon from './components/LoadingDotsIcon';

const CreatePost = React.lazy(() => import('./components/CreatePost'));
const ViewSinglePost = React.lazy(() => import('./components/ViewSinglePost'));
const Search = React.lazy(() => import('./components/Search'));
const Chat = React.lazy(() => import('./components/Chat'));

Axios.defaults.baseURL = process.env.REACT_APP_BACKENDURL || 'https://backend-speakout.herokuapp.com';

const App = () => {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('speakoutToken')),
		flashMessages: [],
		user: {
			token: localStorage.getItem('speakoutToken'),
			username: localStorage.getItem('speakoutUsername'),
			avatar: localStorage.getItem('speakoutAvatar'),
		},
		isSearchOpen: false,
		isChatOpen: false,
		unreadChatCount: 0,
	};

	const ourReducer = (draft, action) => {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true;
				draft.user = action.data;
				break;
			case 'logout':
				draft.loggedIn = false;
				break;
			case 'flashMessage':
				draft.flashMessages.push(action.value);
				break;
			case 'openSearch':
				draft.isSearchOpen = true;
				break;
			case 'closeSearch':
				draft.isSearchOpen = false;
				break;
			case 'toggleChat':
				draft.isChatOpen = !draft.isChatOpen;
				break;
			case 'closeChat':
				draft.isChatOpen = false;
				break;
			case 'incrementUnreadChatCount':
				draft.unreadChatCount++;
				break;
			case 'clearUnreadChatCount':
				draft.unreadChatCount = 0;
				break;
			default:
				break;
		}
	};

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('speakoutToken', state.user.token);
			localStorage.setItem('speakoutUsername', state.user.username);
			localStorage.setItem('speakoutAvatar', state.user.avatar);
		} else {
			localStorage.removeItem('speakoutUsername');
			localStorage.removeItem('speakoutToken');
			localStorage.removeItem('speakoutAvatar');
		}
	}, [state.loggedIn]);

	// Checking if token is not expired

	useEffect(() => {
		if (state.loggedIn) {
			const ourRequest = Axios.CancelToken.source();
			const fetchResults = async () => {
				try {
					const response = await Axios.post(
						'/checkToken',
						{ token: state.user.token },
						{ cancelToken: ourRequest.token }
					);
					if (!response.data) {
						dispatch({ type: 'logout' });
						dispatch({
							type: 'flashMessage',
							value: 'Your session has expired. Please log in again.',
						});
					}
				} catch (error) {
					console.log(error);
				}
			};
			fetchResults();
			return () => ourRequest.cancel();
		}
	}, []);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<Router>
					<FlashMessages flashMessages={state.flashMessages} />
					<Header />
					<Suspense fallback={<LoadingDotsIcon />}>
						<Switch>
							<Route exact path="/">
								{state.loggedIn ? <Home /> : <HomeGuest />}
							</Route>
							<Route path="/about">
								<About />
							</Route>
							<Route path="/terms">
								<Terms />
							</Route>
							<Route path="/create-post">
								<CreatePost />
							</Route>
							<Route exact path="/post/:id">
								<ViewSinglePost />
							</Route>
							<Route exact path="/post/:id/edit">
								<EditPost />
							</Route>
							<Route path="/profile/:username">
								<Profile />
							</Route>
							<Route>
								<NotFound />
							</Route>
						</Switch>
					</Suspense>
					<CSSTransition timeout={330} in={state.isSearchOpen} classNames="search-overlay" unmountOnExit>
						<div className="search-overlay">
							<Suspense fallback="">
								<Search />
							</Suspense>
						</div>
					</CSSTransition>
					<Suspense fallback="">{state.loggedIn && <Chat />}</Suspense>
					<Footer />
				</Router>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};

export default App;
