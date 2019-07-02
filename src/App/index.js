import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import imgjjy from './img/jjy1.jpeg'
import styles from './index.less';

class App extends Component {
	render() {
		return (
      <Fragment>
        <div styleName="bg-img"></div>
        {/* <img src={imgjjy} /> */}
      </Fragment>
		)
	}
}
export default CSSModules(App, styles);