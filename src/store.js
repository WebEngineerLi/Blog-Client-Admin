
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
// import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSagas';
// import { model as loginModel } from './models/login'
// import { model as usersModel } from './models/users';
// import { model as myFileModel } from './models/myFile'
// 导入各个模块的initState

const initialState = {
	// [`${loginModel.namespace}`]: loginModel.initState,
	// [`${usersModel.namespace}`]: usersModel.initState,
	// [`${myFileModel.namespace}`]: myFileModel.initState,
}
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
	// options like actionSanitizer, stateSanitizer
});

// const history = createHistory();
// 在里面分别使用redux-saga和redux-thunk
const middleware = [thunk, sagaMiddleware];
const enhancers = [];
const makeRootReducer = (asyncReducers) => {
	return combineReducers({
		...asyncReducers
	});
};
// createStore传入三个参数参数(reducer, 初始的state,)
export const store = createStore(
	makeRootReducer({}),
	initialState,
	composeEnhancers(
		compose(
			applyMiddleware(...middleware),
			...enhancers
		)
	)
);
sagaMiddleware.run(rootSaga);
store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	// Object.hasOwnProperty() 判断某个对象是否有某个属性值
	// Object.hasOwnProperty.call(store.asyncReducers, key) 使用call来改变this的指向，判断store.asyncReducers这个对象中是否有key这个属性名
	// 假如已经存在就结束，假如不存在就继续赋值
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
	store.asyncReducers[key] = reducer;
	store.replaceReducer(makeRootReducer(store.asyncReducers));
};
export default store;