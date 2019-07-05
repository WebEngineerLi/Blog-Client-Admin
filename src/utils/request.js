import qs from 'querystring';
import { Modal } from 'antd';
import axios from 'axios'
import { createBrowserHistory } from 'history';
import { clearAllCookie } from '../utils/cookie';
import _ from 'lodash';

async function parseJSON(response) {
	const promise = response.json();
	let rst = await promise;
	if (rst.success) {
		return promise;
	} else {
    const close = () => {
      const { code } = rst;
      if(code === "TokenExpiredError") {
        const history = createBrowserHistory();
        clearAllCookie();
        history.replace('/login');
      }
    }
		Modal.error({
			centered: true,
			title: '错误反馈',
      content: rst.data || '请求出错',
      onOk: close,
      onCancel: close
		});
		return promise;
	}
}
export default function request(url, optionsParam = {}) {
  const tempParams = qs.stringify(optionsParam)
  const paramString = tempParams ? `?${tempParams}` : tempParams;
  // 如果是post请求就不改变url, 如果是get请求需要改变url
  const finalUrl = optionsParam.method ? url : `${url}${paramString}`;
  // 默认配置
  const defaultOptions = {
		mode: 'cors',
		credentials: "include",
  }
  // 合并默认配置、自定义配置，用自定义配置覆盖默认配置
  const options = {
    ...defaultOptions,
		...optionsParam,
	}
  if (options.method && options.method.toLowerCase() === 'post') {
    if (!options.body) {
      console.error('post请求必须包含body');
      return;
		}
		options.headers = options.headers || {};
		// 判断是否是文件上传
		if (!(options.body instanceof FormData)) {
			options.body = JSON.stringify(options.body);
			options.headers['Content-Type'] = 'application/json';
		}
	}
	console.log('options:', options);
	
  return fetch(finalUrl, options)
    .then(parseJSON)
}
