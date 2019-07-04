import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';

const AppRouter = (props) => {
	return (
		<BrowserRouter>
			<Route path="/" component={App} />
		</BrowserRouter>
	)
};
export default AppRouter;