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
		yield put({
			type: `${NAMESPACE}/saveInfo`,
			payload: {
				currentData: res.data[0],
			}
		})
	}
}
function *modifyBlog({ payload, callback }) {
	const params = {
		method: 'post',
		body: payload
	}
	const res = yield call(services.blogUpdate, params)
	if (res.success) {
		message.success('保存成功');
	}
}
function *blogDelete({ payload, callback = '' }) {
	const res = yield call(services.blogDelete, payload)
	if (res.success === true) {
		message.success('删除成功');
		yield put({
			type: `${NAMESPACE}/blogList`
		})
		callback && callback(true)
	}
}

function *publishBlog({ payload }) {
	const res = yield call(services.publishBlog, payload)
	if (res.success === true) {
		message.success('发布成功');
		yield put({
			type: `${NAMESPACE}/blogDetail`,
			payload,
		})
	}
}

function *offlineBlog({ payload }) {
	const res = yield call(services.offlineBlog, payload)
	if (res.success === true) {
		message.success('下线成功');
		yield put({
			type: `${NAMESPACE}/blogDetail`,
			payload,
		})
	}
}

function *uploadImg({ payload, callback = '' }) {
	const params = {
		body: payload,
		method: 'post'
	}
	const res = yield call(services.uploadImg, params)
	res.success && callback && callback(res)
}

// 导出一个对本模块监听的saga文件 
export default function* blogSagas() {
	yield takeEvery(`${NAMESPACE}/saveBlog`, saveBlog)
	yield takeEvery(`${NAMESPACE}/blogList`, blogList)
	yield takeEvery(`${NAMESPACE}/blogDetail`, blogDetail)
	yield takeEvery(`${NAMESPACE}/modifyBlog`, modifyBlog)
	yield takeEvery(`${NAMESPACE}/blogDelete`, blogDelete)
	yield takeEvery(`${NAMESPACE}/publishBlog`, publishBlog)
	yield takeEvery(`${NAMESPACE}/offlineBlog`, offlineBlog)
	yield takeEvery(`${NAMESPACE}/uploadImg`, uploadImg)
}
