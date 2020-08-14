import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import './App.css';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import FlashMessages from './components/FlashMessages';
import Profile from './components/Profile';
import EditPost from './components/EditPost';
import NotFound from './components/NotFound';
import Search from './components/Search';

Axios.defaults.baseURL = 'http://localhost:8080';

function App() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('speakoutToken')),
		flashMessages: [],
		user: {
			token: localStorage.getItem('speakoutToken'),
			username: localStorage.getItem('speakoutUsername'),
			avatar: localStorage.getItem('speakoutAvatar'),
		},
		isSearchOpen: false,
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

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<Router>
					<FlashMessages flashMessages={state.flashMessages} />
					<Header />
					<Switch>
						<Route path="/profile/:username">
							<Profile />
						</Route>
						<Route exact path="/">
							{state.loggedIn ? <Home /> : <HomeGuest />}
						</Route>
						<Route path="/post/:id" exact>
							<ViewSinglePost />
						</Route>
						<Route path="/post/:id/edit" exact>
							<EditPost />
						</Route>
						<Route path="/create-post">
							<CreatePost />
						</Route>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/terms">
							<Terms />
						</Route>
						<Route>
							<NotFound />
						</Route>
					</Switch>
					<CSSTransition timeout={330} in={state.isSearchOpen} classNames="search-overlay" unmountOnExit>
						<Search />
					</CSSTransition>
					<Footer />
				</Router>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;
