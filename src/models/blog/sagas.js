import { call, put, takeEvery } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import * as services from './services';
import { message } from 'antd';

// 一些saga的副作用
function *saveBlog({ payload, callback = '' }) {
	const params = {
		method: 'post',
		body: payload
	}
	const res = yield call(services.saveBlog, params)
	if (res.success) {
		message.success('草稿保存成功')
		callback && callback(true)
		yield put({
			type: `${NAMESPACE}/blogList`
		})
	}
}
function *blogList() {
	const res = yield call(services.blogList)
	yield put({
		type: `${NAMESPACE}/saveInfo`,
		payload: {
			blogList: res.data
		}
	})
}
function *blogDetail({ payload, callback = '' }) {
	const res = yield call(services.blogDetail, payload)
	if(res.success) {
		callback && callback(res.data[0])
	}
}


// 导出一个对本模块监听的saga文件 
export default function* blogSagas() {
	yield takeEvery(`${NAMESPACE}/saveBlog`, saveBlog)
	yield takeEvery(`${NAMESPACE}/blogList`, blogList)
	yield takeEvery(`${NAMESPACE}/blogDetail`, blogDetail)
}
