var https = require('../../https/https.js');

const UNCHECKED = 0
const CHECK_SUCCESS = 1
const CHECK_FAILED = 2

const UNQUARANINE = 0
const QUARANINE_SUCCESS = 1
const QUARANINE_FAILED = 2

const LEAVE = 1
const NOT_LEAVE = 0

const PAGE_SIZE = 5

Page({
  data: {
    recordsDisplay: [],
    startTime: '',
    endTime: '',
    currentPage: 1,
    total: 0
  },
  onLoad: function() {
    this.getData()
  },
  bindscrolltolower: function(event) {
    // let test = event.current
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    this.getData()
  },
  
  getData() {
    let params = {
      current: this.data.currentPage,
      size: PAGE_SIZE,
      createdDateStart: this.data.startTime,
      createdDateEnd: this.data.endTime
    }
    let _this = this
    https.getRequest('/common/health-statement/employee/list', params, (res) => {
      if (res && res.data) {
        _this.processData(res.data.records)
        _this.setData({
          currentPage: res.data.current,
          total: res.data.total
        })
      } else {
        console.log('未查询到健康证信息')
      }
    }, (err) => {})
  },
  processData: function(records) {
    let recordsDisplay = []
    let tmp = {}
    let statusDisplay = {}
    let leaveDisplay = {}
    for (let i = 0; i < records.length; i++) {
      tmp = {}
      statusDisplay = {}
      tmp = records[i]
      statusDisplay = this.processStatusDisplay(records[i])
      leaveDisplay = this.processLeaveDisplay(records[i])
      tmp.statusDisplay = statusDisplay
      tmp.leaveDisplay = leaveDisplay
      recordsDisplay.push(tmp)
    }
    this.setData({
      recordsDisplay: this.data.recordsDisplay.concat(recordsDisplay)
    })
  },
  processStatusDisplay: function(record) {
    let statusDisplay = {
      style: 'color:#FFB525;',
      value: '未检疫'
    }
    if (record.quarantineResult == QUARANINE_SUCCESS) {
      statusDisplay.style = 'color:#5AC8B7;'
      statusDisplay.value = '检疫正常'
    } else if (record.status == QUARANINE_FAILED) {
      statusDisplay.style = 'color:#FF5555;'
      statusDisplay.value = '检疫异常'
    }
    return statusDisplay
  },
  processLeaveDisplay: function(record) {
    let leaveDisplay = {
      style: 'color:#5AC8B7;',
      value: '否'
    }
    if (record.whetherToLeave == LEAVE) {
      leaveDisplay.style = 'color: #FF5555;'
      leaveDisplay.value = '是'
    }
    return leaveDisplay
  },
  bindTimeChange: function(event) {
    let name = event.currentTarget.dataset.name
    this.setData({
      [name]: event.detail.value
    })
  },
  search: function() {
    let startTime = new Date(this.data.startTime)
    let endTime = new Date(this.data.endTime)
    if (startTime > endTime) {
      wx.showToast({
        title: '开始时间不能大于结束时间',
        icon: 'none'
      })
    } else {
      this.setData({
        currentPage: 1,
        recordsDisplay: []
      })
      this.getData()
    }
  },
  reset: function() {
    this.setData({
      startTime: '',
      endTime: '',
      currentPage: 1,
      recordsDisplay: []
    })
    this.getData()
  }
})