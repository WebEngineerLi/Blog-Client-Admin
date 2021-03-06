import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import imgjjy from './img/jjy1.jpeg'
import styles from './index.scss';

function HigherComponent(WrappedComponent) {
	const newProps = {
		message: '信息',
	}
	return props => {
		return <WrappedComponent {...props} {...newProps} />
	}
}

@HigherComponent
@CSSModules(styles)
class App extends Component {
	render() {
		return (
			<Fragment>
				<div styleName="bg-img"></div>
			</Fragment>
		)
	}
}
export default App;