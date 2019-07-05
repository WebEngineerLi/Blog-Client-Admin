import { call, put, takeEvery } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';
import { Message } from 'antd';
import { addCookie } from '../../utils/cookie';
import { NAMESPACE } from './constants';
import { saveBlog } from './services';

const initState = {
	isLogin: false
};
// 一些saga的副作用
function *saveBlog({ payload }) {
	const params = {
		method: 'post',
		body: payload
	}
	const res = yield call(saveBlog, params)
}
// 定义并导出reducers
const loginReducers = handleActions({
  [`${NAMESPACE}/saveInfo`]: (state, { payload }) => {
		return {
		...state,
		...payload
	}}
}, initState)

export const model = {
	initState,
	reducers: loginReducers,
	namespace: NAMESPACE
}
// 导出一个对本模块监听的saga文件 
export default function* watchIncrementAsync() {
	yield takeEvery(`${NAMESPACE}/saveBlog`, saveBlog)
}
