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
  onLoad: function(options) {
    let _this = this
    console.log(options.id,options.type)
    var routeParams = {
      id:options.id,
      type:options.type,
      action:options.action
    }
    console.log(routeParams)
    if (options.type === 'EMPLOYEE') {
          _this.getEmployeeInfo(routeParams)
        } else {
          _this.getVisitorInfo(routeParams)
        }
    // const eventChannel = this.getOpenerEventChannel()
    // if (eventChannel && eventChannel.on) {
    //   eventChannel.on('healthInfoId', function(routeParams) {
    //     let type = routeParams.type
    //     if (type === 'EMPLOYEE') {
    //       _this.getEmployeeInfo(routeParams)
    //     } else {
    //       _this.getVisitorInfo(routeParams)
    //     }
    //   })
    // }
  },
  getEmployeeInfo: function(routeParams) {
    let _this = this
    https.getRequest('/common/health-statement/employee/detail/' + routeParams.id, null, (res) => {
      if (res && res.data) {
        let data = res.data
        var time = new Date().getTime()
        // var time1 = new Date(data.healthStatementInfo.validity).getTime()
        if (data.healthStatementInfo.validity) {
          var time1 = new Date(data.healthStatementInfo.validity).getTime()
          if (time > time1) {
            data.healthStatementInfo.ifouttime = true
          } else {
            data.healthStatementInfo.ifouttime = false
          }
        }
        console.log(time,time1)
        console.log(data)
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
  
  getVisitorInfo: function(routeParams) {
    let _this = this
    https.getRequest('/common/health-statement/qr/' + routeParams.id, null, (res) => {
      console.log(res)
      if (res && res.data) {
        let data = res.data
        var time = new Date().getTime()
        
        if (data.validity){
          var time1 = new Date(data.validity).getTime()
          if (time > time1) {
            data.ifouttime = true
          } else {
            data.ifouttime = false
          }
        }
        
        console.log(time, time1)
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
    if(data.validity){
      data.qrEfficient = new Date(data.validity.substring(0, 10)) >= new Date()
      console.log('data.qrEfficient：' + data.qrEfficient)
      return data
    }else{
      return data
    }
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