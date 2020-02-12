import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from '../components/Layout';
import { Home } from '../components/Home/Home';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
	static displayName = App.name;

	//TODO: Solve Routing Problem in this file and NavMenu.
	render () {
		return (
		<Layout>
			<BrowserRouter>
				<div>
					<Route exact path='/' component={Home} />
				</div>
			</BrowserRouter>
		</Layout>
		);
	}
}