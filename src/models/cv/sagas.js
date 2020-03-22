import { call, put, takeEvery } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import * as services from './services';
import { message } from 'antd';

// 一些saga的副作用
function *getCvList({ payload = {} }) {
	const res = yield call(services.getCvList, payload)
	if (res.success) {
		yield put({
			type: `${NAMESPACE}/blogList`
		})
	}
}

// 导出一个对本模块监听的saga文件 
export default function* cvSagas() {
	yield takeEvery(`${NAMESPACE}/getCvList`, getCvList)
}
