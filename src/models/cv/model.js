import { handleActions } from 'redux-actions';
import { NAMESPACE } from './constants';

const initState = {
	cv: {}
};

// 定义并导出reducers
const cvReducers = handleActions({
  [`${NAMESPACE}/saveInfo`]: (state, { payload }) => {
		return {
		...state,
		...payload
	}}
}, initState)

export const model = {
	initState,
	reducers: cvReducers,
	namespace: NAMESPACE
}
