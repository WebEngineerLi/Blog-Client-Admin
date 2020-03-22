import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Login';
import App from './App';
import { store } from '../store';

const AppRouter = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/:module" component={App} />
					<Redirect to="/" />
				</Switch>
			</BrowserRouter>
		</Provider>
	)
};
export default AppRouter;