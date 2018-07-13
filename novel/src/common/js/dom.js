// css3样式兼容
// 能力检测
let elementStyle = document.createElement('div').style;

// 私有前缀供应商
let vendor = (() => {
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}

	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] !== undefined) {
			return key;
		}
	}

	return false;
})();

export function prefixStyle (style) {
	if (vendor === false) {
		return false;
	}

	if (vendor === 'standard') {
		return style;
	}

	return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}