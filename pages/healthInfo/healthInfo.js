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
        let data = _this.processData(res.data)
        _this.setData({
          healthInfoId: routeParams.id,
          type: routeParams.type,
          healthInfo: data,
          showContent: true,
          showButtons: routeParams.action === 'QUARANTINE_SCAN'
        })
      } else {
        console.log('未查询到健康证信息')
      }
    }, (err) => {})
  },
  processData: function(result) {
    let data = JSON.parse(JSON.stringify(result))
    //当前时间小于等于有效期
    data.qrEfficient = new Date(data.validity.substring(0, 10)) >= new Date()
    console.log('data.qrEfficient：' + data.qrEfficient)
    return data
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
      let pk = this.data.type === 'EMPLOYEE' ? 'id' : 'appointId'
      https.putRequest(url, {
        action: action,
        [pk]: _this.data.healthInfoId
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