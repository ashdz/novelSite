import {queryStringParameters} from './config';
import axios from 'axios';

// 排行榜
export function getRankingList (params) {
	const url = 'proxyApi/rank';

	const data = Object.assign({}, queryStringParameters, {
		pn: params.page,
		rankId: params.rankId
	});

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}