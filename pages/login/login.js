var https = require('../../https/https.js');

Page({
  data: {
    account: '',
    password: ''
  },

  bindAccount: function(e) {
    this.setData({
      account: e.detail.value
    })
  },
  bindPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //事件处理函数
  submit: function() {
    https.postRequest(
      '/common/authenticate?username=' + this.data.account + '&password=' + this.data.password, null,
      (res) => {
        wx.setStorageSync('token', res.data.access_token)
        wx.navigateTo({
          url: '../scan/scan'
        })
      },
      (err) => {
        console.log(err)
      }
    )
  },
  onLoad: function() {

  },
})