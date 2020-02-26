var stringUtil = {
  substring: function(str, startIndex, endIndex) {
    var result = ''
    if (str) {
      result = str.substring(startIndex, endIndex)
    }
    return result
  },
  substr: function(str, startIndex, length) {
    var result = ''
    if (str) {
      result = str.substring(startIndex, startIndex + length)
    }
    return result
  },
  isJson: function(str) {
    if (typeof str != 'string') return false
    try {
      var obj = JSON.parse(str);
      return obj && typeof obj == 'object'
    } catch (e) {
      return false;
    }
  }
}

module.exports = {
  substring: stringUtil.substring,
  substr: stringUtil.substr,
  isJson: stringUtil.isJson
}