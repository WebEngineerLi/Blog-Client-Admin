import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from '../store';

const AppRouter = (props) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Route path="/" component={App} />
			</BrowserRouter>
		</Provider>
	)
};
export default AppRouter;