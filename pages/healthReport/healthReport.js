var https = require('../../https/https.js');

Page({
  data: {
    healthInfoId: '',
    healthInfo: {}
  },
  submit: function(event) {
    
  },
  onLoad: function() {

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