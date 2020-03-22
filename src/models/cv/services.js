import request from 'Utils/request';
import baseUrl from 'Utils/baseUrl';

export const getCvList = (config = {}) => request(`${baseUrl}/service/cv/list`, config)
