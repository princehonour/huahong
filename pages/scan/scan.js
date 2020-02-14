//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    healthInfo: {}
  },
  onLoad: function() {
    this.scanCode()
  },
  scanCode: function() {
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: '../healthInfo/healthInfo',
          success: function(res) {
            res.eventChannel.emit('healthInfo', {
              data: healthInfo
            })
          }
        })
      }
    })
  }
})