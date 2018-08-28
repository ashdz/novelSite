// 获取链接中key=value中的value
export function getValue (key) {
	if (key) {
		var href = location.href;
		var index1 = href.indexOf(key+'=');
	    var index2 = href.lastIndexOf('=');
	    var d1 = index2 - key.length;
	    var d2 = index1 + key.length;
	    var parameter = '';

	    if (index1 === -1) {
	        return null;
	    }

	    if (index1 === d1) {
	        parameter = href.substring((index2+1));
	    }else{
	        var index3 = href.indexOf('=',(d2+1));
	        parameter = href.substring((d2+1),index3);
	    }

	    return parameter;
	}else {
		alert('请输入参数！')
	}
}