
import { message } from 'antd'
import API from '../config'

// export default function $downFile (url, op, method = 'post', callback, typeFile = "xlsx") {
export default function $downFile (option) {
  let xhr = new XMLHttpRequest(), loading, op ={}

  loading = document.getElementById('ajaxLoading')
  loading.style.display = 'block'

  if (option.method.toUpperCase() === 'POST') {
    xhr.open("POST", option.url, true)
    xhr.setRequestHeader('mtk', localStorage.getItem('mtk') || API.base.localMTK)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(option.data))
    op.start = option.data.start
    op.end = option.data.end
  } else {
    let params = option.url.split('?')[1].split('&')
    xhr.open('GET', option.url, true)
    xhr.setRequestHeader('mtk', localStorage.getItem('mtk') ||  API.base.localMTK)
    if (params.length) {
      params.forEach(v => {
        op[v.split('=')[0]] = v.split('=')[1]
      })
    }
    xhr.send(null)
  }
  xhr.responseType = "blob" //这里是关键，它指明返回的数据的类型是二进制  
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let response = this.response, a = document.createElement('a'), fileName = this.getResponseHeader('content-disposition') ? this.getResponseHeader('content-disposition').split('=')[1] : op.start + '/' + op.end + "数据统计"
        a.download = this.getResponseHeader('content-disposition') ? fileName : fileName + (option.typeFile || '.xlsx')
        a.href = window.URL.createObjectURL(response);
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        if (option.callback) {
          option.callback()
        }
      } else {
        message.error('下载失败')
      }
      loading.style.display = 'none'
    }
  }
  
}
