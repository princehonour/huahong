var https = require('../../https/https.js');
var untils = require("../../utils/util.js")
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};
Page({
  data: {
    healthInfoId: '',
    healthInfo: {},
    sex: '',
    content: '',
    sexlist: ['男', '女'],
    show2: false,
    carnum: '',
    radio: '1',
    radio2: '1',
    time1: false,
    time1value: '',
    show3: false,
    placeshow: false,
    time2value: '',
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    name: '',
    card: '',
    tel: '',
    pass: '',
    place: '',
    goplace: '',
    goplace1: '',
    allplace: '',
    columns: [{
        values: Object.keys(citys),
        className: 'column1'
      },
      {
        values: citys['浙江'],
        className: 'column2',
        defaultIndex: 2
      },
      {
        values: citys['浙江'],
        className: 'column3',
        defaultIndex: 3
      }
    ],
    placearr: '',
    nowplace: '',
    workplace: '',
  },
  placesure() {
    var that = this
    var arr = this.data.placearr
    console.log(this.data.placearr)
    console.log(arr)
    var st = ''
    if (arr == '') {
      arr = []
      var allplace = that.data.allplace
      st = allplace[0].label + allplace[0].children[0].label + allplace[0].children[0].children[0].label
      arr.push(allplace[0].label)
      arr.push(allplace[0].children[0].label)
      arr.push(allplace[0].children[0].children[0].label)
      that.setData({
        placearr: arr
      })
    } else {
      if (arr[2] != undefined) {
        st = arr[0] + arr[1] + arr[2]
      } else {
        st = arr[0] + arr[1]
      }

    }
    console.log(st)
    this.setData({
      goplace1: st,
      placeshow: false
    })
  },
  placechange1(event) {
    var that = this
    var place = this.data.allplace
    var list = this.data.columns
    const {
      picker,
      value,
      index
    } = event.detail;
    var list2 = {
      values: [],
      className: 'colunms2'
    }
    var list3 = {
      values: [],
      className: 'colunms3'
    }
    var placearr = value
    // picker.setColumnValues(1, citys[value[0]]);
    console.log(value, picker, index)
    console.log(placearr)
    // this.setData({
    //   placearr:value
    // })
    // console.log()
    if (index == 0) {
      for (let i in place) {
        if (value[0] == place[i].label) {
          for (let m in place[i].children) {
            list2.values.push(place[i].children[m].label)
            placearr[1] = place[i].children[0].label
            for (let n in place[i].children[0].children) {
              list3.values.push(place[i].children[0].children[n].label)
              placearr[2] = place[i].children[0].children[0].label
            }
          }
        }
      }

      list[1] = list2
      list[2] = list3
      that.setData({
        columns: list,
        placearr: placearr
      })
    }
    if (index == 1) {
      for (let i in place) {
        if (value[0] == place[i].label) {
          for (let m in place[i].children) {
            list2.values.push(place[i].children[m].label)
            if (value[1] == place[i].children[m].label)
              for (let n in place[i].children[m].children) {
                list3.values.push(place[i].children[m].children[n].label)
                placearr[2] = place[i].children[m].children[0].label
              }
          }
        }
      }
      list[1] = list2
      list[2] = list3
      that.setData({
        columns: list,
        placearr: placearr
      })
    }
  },
  nowplacechange(e) {
    this.setData({
      nowplace: e.detail
    })
  },
  workchange(e) {
    this.setData({
      workplace: e.detail
    })
  },
  placeclose() {
    this.setData({
      placeshow: false,
    })
  },
  chooseplace() {
    this.setData({
      placeshow: true,
    })
  },
  getarea() {
    var that = this
    https.getRequest('/common/region/tree', null, (res) => {
      if (res.code == 1) {
        var place = res.data
        var arr = []
        var list1 = {
          values: [],
          className: 'column1'
        }
        var list2 = {
          values: [],
          className: 'column2'
        }
        var list3 = {
          values: [],
          className: 'column3'
        }
        for (let i in place) {
          list1.values.push(place[i].label)

        }
        for (let m in place[0].children) {
          list2.values.push(place[0].children[m].label)
        }
        for (let n in place[0].children[0].children) {
          list3.values.push(place[0].children[0].children[n].label)
        }
        arr.push(list1)
        arr.push(list2)
        arr.push(list3)
        console.log(arr)
        that.setData({
          allplace: place,
          columns: arr
        })
      }
    }, (err) => {})
  },
  submit1() {
    var that = this
    var ifleave = ''
    if (that.data.typevalue == '居家隔离') {
      ifleave = 1
    } else if (that.data.typevalue == '集中隔离') {
      ifleave = 2
    } else {
      ifleave = ''
    }
    https.postRequest('/a/common/health-statement/employee/apply', {
      livingPlace: that.data.nowplace,
      name: that.data.name,
      whetherDomestic: that.data.radio2,
      outProvince: that.data.radio2 == 1 ? that.data.placearr[0] : '',
      outCity: that.data.radio2 == 1 ? that.data.placearr[1] : '',
      outDistrict: that.data.radio2 == 1 ? (that.data.placearr[2] == undefined ? '' : that.data.placearr[2]) : '',
      outPlace: that.data.radio == 1 ? that.data.goplace : '',
      papersNo: that.data.card,
      returnDate: that.data.radio == 1 ? that.data.time1value : '',
      sex: that.data.sex == '男' ? '1' : '2',
      whetherToLeave: that.data.radio,
      companyName: that.data.workplace
    }, (res) => {
      console.log(res)
      if (res.data.code == 1) {
        wx.showToast({
          title: '填写成功',
          mask: true
        })
        setTimeout(function() {
          wx.reLaunch({
            url: '../home/home',
          })
        }, 1000)
      } else if (res.data.code == 0) {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true
        })
        wx.redirectTo({
          url: '../login/login',
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true
        })
      }
    }, (err) => {})
  },
  submit() {
    var that = this
    that.submit1();
    // if (that.data.name == '' || that.data.sex == '' || that.data.card == '' || that.data.workplace == '' || that.data.nowplace == '') {
    //   wx.showToast({
    //     title: '请填写表单内容',
    //     icon: 'none',
    //     mask: true
    //   })
    // }else if(that.radio == 1){
    //   if(that.data.)
    // }

  },
  namechange(e) {
    this.setData({
      name: e.detail
    })
  },

  cardchange(e) {
    this.setData({
      card: e.detail
    })
  },


  goplacechange(e) {
    this.setData({
      goplace: e.detail
    })
  },



  choosetime1() {
    this.setData({
      time1: true
    })
  },
  onClose() {
    this.setData({
      time1: false
    })
  },


  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },


  choosec(event) {
    this.setData({
      radio2: event.detail
    });
  },
  choosesex() {
    this.setData({
      show2: true
    })
  },
  sure(e) {
    var that = this
    console.log(e)
    this.setData({
      time1value: untils.formatTime(e.detail, 'Y-M-D'),
      time1: false
    })

  },

  onClose1() {
    this.setData({
      show2: false
    })
  },
  onChange2(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      sex: value,
      show2: false
    })
  },
  chooseplate() {
    this.setData({
      plateshow: true
    })
  },
  plateclose() {
    this.setData({
      plateshow: false
    })
  },

  //获取个人信息
  // getinfo() {

  //   var that = this
  //   untils.gets({
  //     method: 'get',
  //     url: '/common/user/detail',
  //     data: {},
  //     token: app.globalData.token
  //   }).then(res => {
  //     console.log(res)
  //     if (res.data.code == 1) {
  //       var type = res.data.data
  //       if (type.sex == '1') {
  //         if (app.globalData.lanuage == '中文') {
  //           type.sex = '男'
  //         } else {
  //           type.sex = 'Male'
  //         }
  //       } else if (type.sex == '2') {
  //         if (app.globalData.lanuage == '中文') {
  //           type.sex = '女'
  //         } else {
  //           type.sex = 'Female'
  //         }
  //       }
  //       that.setData({
  //         name: res.data.data.name,
  //         sex: res.data.data.sex,
  //         tel: res.data.data.compContact,
  //         card: res.data.data.papersNumber,
  //       })

  //     } else {
  //       wx.showToast({
  //         title: res.data.message,
  //         icon: 'none',
  //         mask: true
  //       })
  //       setTimeout(function() {
  //         wx.navigateBack({

  //         })
  //       }, 1500)
  //     }
  //   })
  // },
  onLoad: function() {
    // this.getinfo();
    this.getarea();
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