var https = require('../../https/https.js');

Page({
  data: {
    account: '',
    password: ''
  },

  verification: function(e) {
    var name = e.currentTarget.dataset.name;　
    this.setData({　　　　
      [name]: e.detail.value.replace(/\s+/g, '')
    })
  },
  //事件处理函数
  submit: function() {
    https.postRequest(
      '/common/quarantine/authenticate?username=' + this.data.account + '&password=' + this.data.password, null,
      (res) => {
        wx.setStorageSync('token', res.data.access_token)
        wx.navigateTo({
          url: '../homePage/homePage'
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