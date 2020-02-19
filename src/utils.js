// 判断是否为空  是空返回true 不为空则返回false
export function isEmpty(obj) {
  if (!obj || obj === "") {
    return true
  } else if (typeof obj === "object") {
    for (let prop in obj) {
      return false
    }
    return true
  }
  return false
}

// table合并栏
export function renderTableFooter (option) {
  let sum = 0, pageSize = 9
  if (option.data.length < 10) {
    pageSize = option.data.length - 1
  }
  if (option.index / pageSize === 1) {
    if (option.firstColumns) {
      return option.firstColumns
    } else {
      sum = option.data.reduce((total, currentValue) => {
        return total + currentValue[option.target]
      }, 0)
      return sum.toFixed(option.toFixed || 0)
    }
  } else {
    return typeof option.value === 'number' ? option.value.toFixed(option.toFixed || 0) : option.value
  }
}

// table合并栏
export function sortOrderTable(a, b, target) {
  return a[target] - b[target]
}

export function formaterTime(timestamp, format = 'yyyy-mm-dd') {
  //format:  "yyyy-m-d h:i:s.S","yyyy年mm月dd日 hh:ii:ss"  default: "yyyy-mm-dd"
  let obj = parseInt(timestamp), date = new Date(obj),
    data = {
      "m+": date.getMonth() + 1,                 //月   
      "d+": date.getDate(),                    //日   
      "h+": date.getHours(),                   //小时   
      "i+": date.getMinutes(),                 //分   
      "s+": date.getSeconds(),                 //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds()             //毫秒   
    }
  if (/(y+)/.test(format)) {  // date.getFullYear() + ""  转为字符串
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (let k in data) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (data[k]) : (("00" + data[k]).substring(("" + data[k]).length)))
    }
  }
  return format
}