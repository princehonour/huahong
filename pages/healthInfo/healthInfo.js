var https = require('../../https/https.js');

Page({
  data: {
    healthInfoId: '',
    healthInfo: {},
    submitDisable: false
  },
  //事件处理函数
  submit: function(event) {
    this.setData({
      submitDisable: true
    })
    setTimeout(() => {
      let _this = this
      let action = event.currentTarget.dataset.action
      https.putRequest('/common/health-statement/quarantine', {
        action: action,
        id: _this.data.healthInfoId
      }, (res) => {
        wx.navigateTo({
          url: '../homePage/homePage'
        })
      }, (err) => {
        _this.setData({
          submitDisable: false
        })
      })
    }, 200)
  },
  onLoad: function() {
    let _this = this
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel && eventChannel.on) {
      eventChannel.on('healthInfoId', function(data) {
        https.getRequest('/common/health-statement/detail/' + data.id, null, (res) => {
          if (res && res.data) {
            _this.setData({
              healthInfoId: data.id,
              healthInfo: res.data
            })
          } else {
            wx.showToast({
              title: '未查询到健康证信息',
              icon: 'none'
            })
          }
        }, (err) => {})
      })
    }
  },
  checkNotNull(value) {
    if (!value) {
      return false
    } else if (JSON.stringify(value) === '{}') {
      return false
    }
    return true
  }
})