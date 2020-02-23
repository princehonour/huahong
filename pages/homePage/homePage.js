var https = require('../../https/https.js');

Page({
  data: {
    personalInfo: {},
    healthInfo: {},
    permissions: [],
    analysisData: {
      quarantineNumber: 0,
      quarantineNormalNumber: 0,
      quarantineAbnormalNumber: 0
    }
  },
  // onShow: function() {
  //   wx.hideHomeButton({
  //     success: function() {},
  //     fail: function() {},
  //     complete: function() {}
  //   })
  // },
  onLoad: function() {
    this.getUserInfo()
    this.getAnalysisData()
  },
  scanCode: function(event) {
    let action = event.currentTarget.dataset.action
    wx.scanCode({
      success: (scanres) => {
        if (JSON.parse(scanres.result)) {
          let result = JSON.parse(scanres.result)
          if (this.checkId(result)) {
            wx.navigateTo({
              url: '../healthInfo/healthInfo',
              success: function(res) {
                res.eventChannel.emit('healthInfoId', {
                  id: result.id,
                  type: result.type,
                  action: action
                })
              }
            })
          }

        } else {
          wx.showToast({
            title: '请扫描正确的二维码',
            icon: 'none'
          })
        }
      }
    })
  },
  checkId: function(result) {
    // { "id": "2df3060e6ebfc31cf708a6dd848be79f", "type": "EMPLOYEE" }
    return result && result.id && result.type
    // return result && result.id && result.type ?
    //   /[0-9a-f]{8}([0-9a-f]{4}){3}[0-9a-f]{12}/.test(result.id) :
    //   false
  },
  getUserInfo: function() {
    let _this = this
    https.getRequest('/sys/user/info', null, (res) => {
      if (res && res.data) {
        _this.setData({
          permissions: res.data.permissions
        })
      } else {
        console.log('未查询到个人信息')
      }
    }, (err) => {})
  },
  getAnalysisData: function() {
    let _this = this
    https.getRequest('/common/health-statement/quarantine/analysis', null, (res) => {
      if (res && res.data) {
        _this.setData({
          analysisData: res.data
        })
      } else {
        console.log('未查询到检疫统计信息')
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