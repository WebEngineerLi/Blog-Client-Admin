import * as cons from './constants';
export const getState = (state) => state[cons.NAMESPACE] //eslint-disable-line
export const blogList = (state) => {
	const currentState = getState(state);
	return currentState.blogList
}

export const getCurrentData = (state) => {
	const currentState = getState(state);
	return currentState.currentData
}

export const getTabs = (state) => {
	const currentState = getState(state);
	return currentState.tabs;
}