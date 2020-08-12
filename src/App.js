import React from 'react';
import './App.css';
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';

const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/">
					<HomeGuest />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/terms">
					<Terms />
				</Route>
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
