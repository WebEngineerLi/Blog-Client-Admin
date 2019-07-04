import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ImageConfig from '../ImageConfig';
import FormComponent from '../FormComponent';

const App = (props) => {
	return (
	<Switch>
		<Route exact path="/" component={ImageConfig} />
		<Route exact path="/test" component={FormComponent} />
	</Switch>
)};
export default App;