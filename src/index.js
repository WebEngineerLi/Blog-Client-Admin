import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader"
import Routes from './routes';
import { injectReducer } from './store';
import { model as blogModel } from './models/blog';

 // 注入每个模块的reducer
injectReducer(blogModel.namespace, blogModel.reducers);

const render = (Routes) => {
  ReactDOM.render(
    <AppContainer>
      <Routes />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Routes);

if (module.hot) {
  module.hot.accept('./routes/index.js', () => {
    render(require('./routes/index.js').default)
  })
}
