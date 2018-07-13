import {queryStringParameters} from './config';
import axios from 'axios';

export function getRankingList (params) {
	const url = 'https://yd.sogou.com/h5/ajax/rank';

	const data = Object.assign({}, queryStringParameters, {
		pn: params.page,
		rankId: params.rankId
	});

	return axios.post(url, {
		params: data
	}).then((res) => {
		return Promise.reslove(res.data);
	});
}