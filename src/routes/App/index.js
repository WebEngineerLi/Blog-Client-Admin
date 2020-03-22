import React, { useEffect, useCallback } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { getCookie } from 'Utils/cookie';
import BlogMenu from '@/components/BlogMenu'
import Header from '@/components/Header';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import Blog from '../Blog';
import Cv from '../Cv';

const App = (props) => {
	const {
		location: {
			pathname
		},
		history
	} = props;
	useEffect(() => {
		const userInfo = getCookie('userInfo');
		if (!userInfo && pathname !== "/login") {
			history.push('/login');
		}
	}, [])

	return (
		<div styleName="app-layout">
			<Header />
			<div styleName="app-content">
				<div styleName="menu">
					<BlogMenu {...props} />
				</div>
				<div styleName="content">
					<Switch>
						<Route exact path="/article" component={Blog} />
						<Route exact path="/cv" component={Cv} />
						<Redirect to="/article" />
					</Switch>
				</div>
			</div>
		</div>
	)
};
export default CSSModules(App, styles);