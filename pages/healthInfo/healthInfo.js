var https = require('../../https/https.js');

Page({
  data: {
    healthInfoId: '',
    healthInfo: {}
  },
  //事件处理函数
  submit: function(event) {
    let _this = this
    let action = event.currentTarget.dataset.action
    https.putRequest('/common/health-statement/quarantine', {
      action: action,
      id: _this.data.healthInfoId
    }, (res) => {
      wx.navigateTo({
        url: '../scan/scan'
      })
    }, (err) => {})
  },
  onLoad: function() {
    let _this = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('healthInfoId', function(data) {
      https.getRequest('/common/health-statement/detail/' + data.id, null, (res) => {
        _this.setData({
          healthInfoId: data.id,
          healthInfo: res.data
        })
      }, (err) => {})
    })
  },
})