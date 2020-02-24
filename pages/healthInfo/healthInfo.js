var https = require('../../https/https.js');

Page({
  data: {
    healthInfoId: '',
    healthInfo: {},
    submitDisable: false,
    showContent: false,
    showButtons: false,
    type: 'EMPLOYEE'
  },
  onLoad: function() {
    let _this = this
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel && eventChannel.on) {
      eventChannel.on('healthInfoId', function(routeParams) {
        let type = routeParams.type
        if (type === 'EMPLOYEE') {
          _this.getEmployeeInfo(routeParams)
        } else {
          _this.getVisitorInfo(routeParams)
        }
      })
    }
  },
  getEmployeeInfo: function(routeParams) {
    let _this = this
    https.getRequest('/common/health-statement/employee/detail/' + routeParams.id, null, (res) => {
      if (res && res.data) {
        _this.setData({
          healthInfoId: routeParams.id,
          type: routeParams.type,
          healthInfo: res.data,
          showContent: true,
          showButtons: routeParams.action === 'QUARANTINE_SCAN'
        })
      } else {
        console.log('未查询到健康证信息')
      }
    }, (err) => {})
  },
  getVisitorInfo: function(routeParams) {
    let _this = this
    https.getRequest('/common/health-statement/qr/' + routeParams.id, null, (res) => {
      if (res && res.data) {
        _this.setData({
          healthInfoId: routeParams.id,
          type: routeParams.type,
          healthInfo: res.data,
          showContent: true,
          showButtons: routeParams.action === 'QUARANTINE_SCAN'
        })
      } else {
        console.log('未查询到健康证信息')
      }
    }, (err) => {})
  },
  //事件处理函数
  submit: function(event) {
    this.setData({
      submitDisable: true
    })
    setTimeout(() => {
      let _this = this
      let action = event.currentTarget.dataset.action
      let url = this.data.type === 'EMPLOYEE' ? '/common/health-statement/employee/quarantine' : '/common/health-statement/quarantine'
      https.putRequest(url, {
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
  }
})