var https = require('../../https/https.js');

const UNCHECKED = 0
const CHECK_SUCCESS = 1
const CHECK_FAILED = 2

const QUARANINE_SUCCESS = 1
const QUARANINE_FAILED = 2


Page({
  data: {
    records: [],
    recordsDisplay: [],
    startTime: '',
    endTime: ''
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
            status: 1,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          },
          {
            checkTime: '2020-2-20 09:05',
            status: 1,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          },
          {
            checkTime: '2020-2-20 09:05',
            status: 1,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          },
          {
            checkTime: '2020-2-20 09:05',
            status: 1,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          },
          {
            checkTime: '2020-2-20 09:05',
            status: 2,
            name: '李大宝',
            plateNum: '沪A125k1',
            phoneNum: '18236598522',
            submitTime: '2020-2-30 08:30'
          }
        ]
      })
      this.processData()
    }, 1000)
  },
  processData: function() {
    let records = JSON.parse(JSON.stringify(this.data.records))
    let recordsDisplay = []
    let tmp = {}
    let statusDisplay = {}
    for (let i = 0; i < records.length; i++) {
      tmp = {}
      statusDisplay = {}
      tmp = records[i]
      statusDisplay = this.processStatusDisplay(records[i])
      tmp.statusDisplay = statusDisplay
      recordsDisplay.push(tmp)
    }
    this.setData({
      recordsDisplay: recordsDisplay
    })
  },
  processStatusDisplay: function(record) {
    let statusDisplay = {}
    if (record.status == QUARANINE_SUCCESS) {
      statusDisplay.style = 'color:#5AC8B7;'
      statusDisplay.value = '检疫正常'
    } else if (record.status == QUARANINE_FAILED) {
      statusDisplay.style = 'color:#FF5555;'
      statusDisplay.value = '检疫异常'
    }
    return statusDisplay
  },
  bindTimeChange: function(event) {
    let name = event.currentTarget.dataset.name
    this.setData({
      [name]: event.detail.value
    })
  },
  search: function(){
    
  }
})