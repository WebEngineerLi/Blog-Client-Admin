import { handleActions } from 'redux-actions';
import { NAMESPACE } from './constants';

const initState = {
	blogList: [],
	currentData: {},
	tabs: []
};

// 定义并导出reducers
const blogReducers = handleActions({
  [`${NAMESPACE}/saveInfo`]: (state, { payload }) => {
		console.log('payload:', payload);
		
		return {
		...state,
		...payload
	}}
}, initState)

export const model = {
	initState,
	reducers: blogReducers,
	namespace: NAMESPACE
}
