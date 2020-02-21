import drawQrcode from '../../utils/weapp.qrcode.min.js'

var https = require('../../https/https.js');

Page({
  data: {
    personalInfo: {},
  },

  onLoad: function() {
    this.getData()
  },
  getData: function() {
    let _this = this
    https.getRequest('/common/health-statement/new', null, (res) => {
      if (res && res.data) {
        _this.setData({
          personalInfo: res.data
        })
        drawQrcode({
          width: 180,
          height: 180,
          canvasId: 'myQrcode',
          text: this.data.personalInfo.qrcode
        })
      } else {
        //TODO test
        // _this.setData({
        //   personalInfo: {
        //     qrcode: 'www.baidu.com'
        //   }
        // })
        wx.showToast({
          title: '未查询到二维码',
          icon: 'none'
        })
      }
    }, (err) => {})
  },
})