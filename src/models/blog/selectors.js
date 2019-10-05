import React from 'react';
import * as cons from './constants';
export const getState = (state) => state[cons.NAMESPACE] //eslint-disable-line
export const blogList = (state) => {
	const currentState = getState(state);
	const list = currentState.blogList.map(item => ({
		key: item.blogId,
		label: item.blogTitle,
		icon: ''
	}))
	return list;
}

export const getCurrentData = (state) => {
	const currentState = getState(state);
	return currentState.currentData
}

export const getTabs = (state) => {
	const currentState = getState(state);
	return currentState.tabs;
}