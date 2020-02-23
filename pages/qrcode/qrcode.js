import drawQrcode from '../../utils/weapp.qrcode.min.js'

var https = require('../../https/https.js');

Page({
  data: {
    qrCode: ''
  },

  onLoad: function() {
    this.getData()
  },
  getData: function() {
    let _this = this
    https.getRequest('/common/health-statement/employee/new', null, (res) => {
      if (res && res.data) {
        let qrCode = res.data.qrCode
        if (qrCode) {
          drawQrcode({
            width: 180,
            height: 180,
            canvasId: 'myQrcode',
            text: qrCode
          })
        }
        _this.setData({
          qrCode: qrCode
        })
      } else {
        console.log('未查询到二维码')
        // wx.showToast({
        //   title: '未查询到二维码',
        //   icon: 'none'
        // })
      }
    }, (err) => {})
  },
})