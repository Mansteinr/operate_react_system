
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
export function renderTableFooter(option) {
  let sum = 0
  if (option.data.length - 1 === option.index) {
    sum = option.data.reduce((total, currentValue) => {
      return total + currentValue[option.target]
    }, 0)
    return sum.toFixed(option.toFixed || 0)
  } else {
    return option.value.toFixed(option.toFixed || 0)
  }
}