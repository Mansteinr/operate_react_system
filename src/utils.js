
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