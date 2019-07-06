import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ImageConfig from '../ImageConfig';
import FormComponent from '../FormComponent';
import Blog from '../Blog';

const App = (props) => {
	return (
	<Switch>
		<Route exact path="/" component={Blog} />
		<Route exact path="/img" component={ImageConfig} />
		<Route exact path="/test" component={FormComponent} />
	</Switch>
)};
export default App;