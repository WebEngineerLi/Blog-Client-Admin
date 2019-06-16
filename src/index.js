import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

renderWithHotReload(App);

if (module.hot) {
	module.hot.accept("./App/index.js", () => {
		const App = require("./App/index.js").default;
		renderWithHotReload(App);
	});
}

const renderWithHotReload = (App) => {
	ReactDOM.render(
		<AppContainer>
			<App />
		</AppContainer>,
		document.getElementById("root")
	);
}
