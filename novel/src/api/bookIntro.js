import {queryStringParameters} from './config';
import axios from 'axios';

// 书本介绍
export function getBookIntro (params) {
	const url = 'proxyApi/bag/getLocalShelfBook';

	const data = Object.assign({}, queryStringParameters, {
		bkey: params.bkey,
		ckey: params.ckey
	});

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}