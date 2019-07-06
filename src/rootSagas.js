import { all } from 'redux-saga/effects'
import blogSagas from './models/blog'

export default function* rootSaga() {
	yield all([
		blogSagas()
	])
}