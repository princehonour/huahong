var https = require('../../https/https.js');

Page({
  data: {
    personalInfo: {},
    healthInfo: {},
    checkInfo: {
      total: 18960,
      normal: 18956,
      abnormal: 4
    }
  },
  onShow: function() {
    wx.hideHomeButton()
  },
  onLoad: function() {
    this.getData()
  },
  scanCode: function(event) {
    let action = event.currentTarget.dataset.action
    wx.scanCode({
      success: (scanres) => {
        if (this.checkId(scanres.result)) {
          wx.navigateTo({
            url: '../healthInfo/healthInfo',
            success: function(res) {
              res.eventChannel.emit('healthInfoId', {
                id: scanres.result,
                action: action
              })
            }
          })
        } else {
          wx.showToast({
            title: '请扫描正确的二维码',
            icon: 'none'
          })
        }
      }
    })
  },
  checkId: function(id) {
    console.log(id)
    return /[0-9a-f]{8}([0-9a-f]{4}){3}[0-9a-f]{12}/.test(id);
  },
  getData: function() {
    https.getRequest('/common/health-statement/new', null, (res) => {
      if (res && res.data) {
        _this.setData({
          personalInfo: res.data
        })
      } else {
        // wx.showToast({
        //   title: '未查询到个人信息',
        //   icon: 'none'
        // })
      }
    }, (err) => {})
  },
  toQrcode: function() {
    wx.navigateTo({
      url: '../qrcode/qrcode'
    })
  },
  toHealthReport: function() {
    wx.navigateTo({
      url: '../healthReport/healthReport'
    })
  },
  toHealthRecord: function() {
    wx.navigateTo({
      url: '../healthRecord/healthRecord'
    })
  }
})