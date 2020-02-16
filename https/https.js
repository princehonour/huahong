var baseurl = 'http://180.168.107.58:8071' //对外线上
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
    title: "正在加载中...",
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
      if (res.data.code == '-1' && res.data.errorCode == '501') {
        wx.navigateTo({
          url: '/pages/index/index?reLogin=' + 1,
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