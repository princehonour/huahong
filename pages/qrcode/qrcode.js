import drawQrcode from '../../utils/weapp.qrcode.min.js'

var https = require('../../https/https.js');

const QRCODE_SIZE_RPX = 340

Page({
  data: {
    qrcodeSize: 0,
    qrCode: ''
  },
  onLoad: function() {
    this.calculateQrcodeSize()
    this.getData()
  },
  getData: function() {
    let _this = this
    https.getRequest('/common/health-statement/employee/new', null, (res) => {
      if (res && res.data) {
        let qrCode = res.data.qrCode
        if (qrCode) {
          drawQrcode({
            width: this.data.qrcodeSize,
            height: this.data.qrcodeSize,
            canvasId: 'myQrcode',
            text: qrCode
          })
        }
        _this.setData({
          qrCode: qrCode
        })
      } else {
        console.log('未查询到二维码')
      }
    }, (err) => {})
  },
  calculateQrcodeSize: function() {
    let _this = this
    // 1rpx = 750 / 设备屏幕宽度
    wx.getSystemInfo({
      success: function(res) {
        let qrcodeSize = (QRCODE_SIZE_RPX * (res.windowWidth / 750));
        _this.setData({
          qrcodeSize: qrcodeSize
        })
      }
    })
  }
})