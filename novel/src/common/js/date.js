export function formatDate (date, fmt) {
  // 正则匹配，判断是否有年份的参数，如果匹配到y+开头则表示有年份
  if (/(y+)/.test(fmt)) {
    // RegExp.$1表示匹配到的第一个即4个y(y+);substr根据传入的对应的y长度截取（1992，992，92，2）
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 定义一个对象，用于根据传入的参数正在匹配执行对应的方法
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (let k in o) {
    // new RegExp(`(${k})`):构造一个正则表达式
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1 ? str : padLeftZero(str)));
    }
  }

  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
