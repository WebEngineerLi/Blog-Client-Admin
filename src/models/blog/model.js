import { handleActions } from 'redux-actions';
import { NAMESPACE } from './constants';

const initState = {
	blogList: [],
	currentData: {}
};

// 定义并导出reducers
const blogReducers = handleActions({
  [`${NAMESPACE}/saveInfo`]: (state, { payload }) => {
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
