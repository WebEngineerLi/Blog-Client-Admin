import request from 'Utils/request';
import baseUrl from 'Utils/baseUrl';
export function saveBlog(data) {
	return request(`${baseUrl}/service/register`, data)
}