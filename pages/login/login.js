var https = require('../../https/https.js');

Page({
  data: {
    account: '',
    password: '',
    autoLogin: false,
    eyeStatus: 'close'
  },
  onLoad: function() {
    this.autoLogin()
  },
  autoLogin: function() {
    let auto_token = wx.getStorageSync('auto_token')
    if (auto_token) {
      wx.setStorageSync('token', auto_token)
      wx.navigateTo({
        url: '../homePage/homePage'
      })
    }
  },
  verification: function(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      [name]: (e.detail.value + '').replace(/\s+/g, '')
    })
  },
  checkboxChange: function(e) {
    this.setData({
      autoLogin: e.detail.value[0] === 'auto_login'
    })
  },
  //事件处理函数
  submit: function() {
    if (!this.preCheck()) return
    let _this = this
    https.postRequest(
      '/common/quarantine/authenticate',{
        username:this.data.account,
        password: this.data.password
      },
      (res) => {
        if (res.data) {
          _this.handleToken(res.data.access_token)
          wx.setStorage({
            key: 'permissions',
            data: res.data.permissions,
            success: function() {
              wx.navigateTo({
                url: '../homePage/homePage'
              })
            }
          })
        }
      },
      (err) => {
        console.log(err)
      }
    )
  },
  handleToken: function(token) {
    wx.setStorageSync('token', token)
    if (this.data.autoLogin) {
      wx.setStorageSync('auto_token', token)
    } else {
      wx.removeStorageSync('auto_token')
    }
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
  toggleEye: function() {
    this.setData({
      eyeStatus: this.data.eyeStatus === 'open' ? 'close' : 'open'
    })
  }
})