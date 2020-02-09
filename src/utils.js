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
  console.log(option.index)
  let sum = 0, pageSize = 9
  if (option.data.length < 10) {
    pageSize = option.data.length - 1
  }
  console.log(pageSize, option.index, option.data.length)
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