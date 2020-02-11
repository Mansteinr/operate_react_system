import axios from 'axios'
import { message } from 'antd'
import API from '../config'
// 封装axios请求

export default class Axios {
  static ajax(options) {
    let loading, opt = {}
    loading = document.getElementById('ajaxLoading')
    loading.style.display = 'block'
    
    opt = {
      url: options.url, // 后台地址
      responseType: options.responseType || 'json', // 默认返回类型为json
      method: options.method || 'post', // 默认post请求
      headers: {
        mtk: localStorage.getItem('mtk') || API.base.localMTK,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    if (opt.method === 'post') { // get post 方法兼容
      opt = Object.assign(opt, {data: options.data})
    } else {
      opt = Object.assign(opt, {params: options.data})
    }
    return new Promise((reslove, reject) => {
      // 成功
      axios(opt).then(res => { // 成功并且返回码为1
        if(res.data.resCode) {
          reslove(res.data)
        } else {  //失败
          if (res.data.resMsg[0].msgCode === '10005') { // 未登陆强制登陆
            window.location.href = window.location.origin + '/#/Login' // 跳转页面
          } else if (res.data.resMsg[0].msgCode === '40001005') {
            message.warning(res.data.resMsg[0].msgText)
          } else {
            message.warning(res.data.resMsg[0].msgText)
          }
        }
        loading.style.display = 'none'
      }).catch(err => {
        reject(err.message)
        message.error(err.message)
        loading.style.display = 'none'
      })
    })
  }
}