//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    healthInfo:{
      name:'张胜',
      sex:'女',
      paperNum: '511888888'
    }
  },
  //事件处理函数
  submit: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
})
