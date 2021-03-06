// var baseurl = 'http://180.168.107.58:8071' //对外线上
var baseurl = 'http://180.168.107.58:8061' //对外线上
// var baseurl = 'http://192.168.0.183:8061' //朝宇
// var baseurl = 'https://appointment.saylooks.com' //生产环境
var prefix = '/a'

/**
 * 请求头
 */
wx.getStorage({
  key: 'token',
  success: function(res) {},
})

function getRequest(url, params, onSuccess, onFailed) {
  request(url, params, "GET", onSuccess, onFailed);
}

function postRequest(url, params, onSuccess, onFailed) {
  request(url, params, "POST", onSuccess, onFailed);
}

function putRequest(url, params, onSuccess, onFailed) {
  request(url, params, "PUT", onSuccess, onFailed);
}

function deleteRequest(url, params, onSuccess, onFailed) {
  request(url, params, "DELETE", onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, onSuccess, onFailed) {
  wx.showLoading({
    title: "加载中...",
    mask: true
  })
  wx.request({
    url: baseurl + prefix + url,
    data: params,
    method: method,
    header: {
      'Authorization': wx.getStorageSync("token")
    },
    success: function(res) {
      wx.hideLoading();
      if (res.statusCode == 401 && res.data && res.data.httpStatus === 'OK') {
        wx.removeStorageSync('auto_token')
        wx.showToast({
          title: '登录超时，请重新登录',
          icon: 'none'
        })
        wx.navigateTo({
          url: '../login/login'
        })
      }
      if (res.data) {
        /** start 根据需求 接口的返回状态码进行处理 */
        if (res.data.code == 1) {
          onSuccess(res.data); //request success
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          }) //request failed
        }
        /** end 处理结束*/
      }
    },
    fail: function(error) {
      wx.hideLoading();
      onFailed(error); //failure for other reasons
    }
  })
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest,
  putRequest: putRequest,
  deleteRequest: deleteRequest
}