import {queryStringParameters} from './config';
import axios from 'axios';

// 书本介绍
export function getCatalogue (params) {
	const url = 'catalogueApi/detail';

	const data = Object.assign({}, queryStringParameters, {
		bkey: params.bkey,
		p: params.p,
		asc: 'asc',
		gf: 'ebye-d1-pdetail-i',
	});

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}