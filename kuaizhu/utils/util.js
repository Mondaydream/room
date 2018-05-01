const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}




//promise
var Promise = require('./es6-promise.min.js')

function wxPromisify(fn, scope) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res);
      }
      obj.fail = function (res) {
        reject(res);
      }
      if (scope) {
        //改变this指向
        var newFn = fn.bind(scope);
        newFn(obj);
      } else {
        fn(obj);
      }
    })
  }
}

module.exports = {
  formatTime: formatTime,
  json2Form: json2Form,
  isEmptyObject: isEmptyObject,
  wxPromisify: wxPromisify,

}

