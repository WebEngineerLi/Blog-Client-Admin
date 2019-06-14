import React, { Component } from 'react';
import { AppContainer } from "react-hot-loader"
import jjy from './img/jjy1.jpeg';

class App extends Component {
	render () {
		return (
			<AppContainer>
				<img src={jjy} />
			</AppContainer>
		)
	}
}
export default App;