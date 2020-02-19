var https = require('../../https/https.js');

Page({
  data: {
    records: []
  },
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
    // https.getRequest('/common/health-statement/detail/' + data.id, null, (res) => {
    //   if(res && res.data){
    //     _this.setData({
    //       healthInfoId: data.id,
    //       healthInfo: res.data
    //     })
    //   }else{
    //     wx.showToast({
    //       title: '未查询到健康证信息',
    //       icon: 'none'
    //     })
    //   }
    // }, (err) => {})
    setTimeout(() => {
      this.setData({
        records: [{
            checkTime: '2020-2-20 09:05',
            checkStatus: 0,
            status: 0,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          },
          {
            checkTime: '2020-2-20 09:05',
            checkStatus: 1,
            status: 0,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          },
          {
            checkTime: '2020-2-20 09:05',
            checkStatus: 2,
            status: 0,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          },
          {
            checkTime: '2020-2-20 09:05',
            checkStatus: 1,
            status: 1,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          },
          {
            checkTime: '2020-2-20 09:05',
            checkStatus: 1,
            status: 2,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          }
        ]
      })
    }, 1000)
  }
})