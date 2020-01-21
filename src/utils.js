
// 判断是否为空  是空返回true 不为空则返回false
export function isEmpty(obj) {
  if (!obj || obj == "" || obj == '--') {
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
export function renderTableFooter(value, record, index, target, data) {
  let sum = 0
  if (data.length - 1 === index) {
    return sum = data.reduce((total, currentValue) => {
      return total + currentValue[target]
    }, 0)
  } else {
    return value
  }
}