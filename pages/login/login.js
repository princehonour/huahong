var https = require('../../https/https.js');

Page({
  data: {
    account: '',
    password: '',
    autoLogin: false
  },

  verification: function(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({　　　　
      [name]: (e.detail.value + '').replace(/\s+/g, '')
    })
  },
  //事件处理函数
  submit: function() {
    if (!this.preCheck()) return
    https.postRequest(
      '/common/quarantine/authenticate?username=' + this.data.account + '&password=' + this.data.password, null,
      (res) => {
        wx.setStorageSync('token', res.data.access_token)
        if (this.data.auto_token) {
          wx.setStorageSync('auto_token', res.data.access_token)
        }
        wx.navigateTo({
          url: '../homePage/homePage'
        })
      },
      (err) => {
        console.log(err)
      }
    )
  },
  preCheck: function() {
    if (!this.data.account) {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none'
      })
      return false
    } else if (!this.data.password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return false
    }
    return true
  },
  onLoad: function() {
    let auto_token = wx.wx.getStorageSync('auto_token')
    if (auto_token) {
      wx.setStorageSync('token', auto_token)
      wx.navigateTo({
        url: '../homePage/homePage'
      })
    }
  },
})