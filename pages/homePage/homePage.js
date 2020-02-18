//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    healthInfo: {}
  },
  onLoad: function() {

  },
  scanCode: function() {
    wx.scanCode({
      success: (scanres) => {
        if (this.checkId(scanres.result)) {
          wx.navigateTo({
            url: '../healthInfo/healthInfo',
            success: function(res) {
              res.eventChannel.emit('healthInfoId', {
                id: scanres.result
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
  }
})