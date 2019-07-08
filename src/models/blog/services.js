import request from 'Utils/request';
import baseUrl from 'Utils/baseUrl';
export const saveBlog = (config = {}) => request(`${baseUrl}/service/blog/post`, config)

export const blogList = (config = {}) => request(`${baseUrl}/service/blog/list`, config)

export const blogDetail = (config = {}) => request(`${baseUrl}/service/blog/detail`, config)

export const blogUpdate = (config = {}) => request(`${baseUrl}/service/blog/update`, config)

export const blogDetete = (config = {}) => request(`${baseUrl}/service/blog/delete`, config)