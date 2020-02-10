
// 处理异步请求

// 组件中发送的dispatch reducer和saga都能接收到
// 对于异步请求来说 组件中dispatch先发送至 saga
// 异步完成之后 在saga在发送一个dispatch至reducer

import API from '@/config'
import Axios from '@/axios'
import { message } from 'antd'
import { put, takeEvery, fork } from 'redux-saga/effects'
import {
  GET_LIGHTSIGNIN_CUSTOMERS_ACTION,
  GET_LIGHTSIGNIN_APPINFO_ACTION,
  GET_APPINFODETAIL_ACTION,
  del_APPNEWS_ACTION,
} from './actionTypes'
import {
  getLightSignInCustomersListAction,
  getLightSignInAppInfoListAction,
  getAppInfoDetailNewsAction,
  getLightSignInAppInfoAction
} from './actionCreators'

function* getLightSignInCustomers (prama) {
  const res = yield Axios.ajax({
    url: API.lightSignIn.customers,
    data: prama.data,
    method: 'get'
  })
  yield put(getLightSignInCustomersListAction(res.resData))
}

// generator 函数
function* LightSignInCustomers () {
  yield takeEvery(GET_LIGHTSIGNIN_CUSTOMERS_ACTION, getLightSignInCustomers)
}

function* getLightSignInAppInfo (prama) {
  const res = yield Axios.ajax({
    url: `${API.lightSignIn.appInfo}/${prama.data}`,
    method: 'get'
  })
  yield put(getLightSignInAppInfoListAction(res.resData))
}

// generator 函数
function* LightSignInAppInfoAction () {
  yield takeEvery(GET_LIGHTSIGNIN_APPINFO_ACTION, getLightSignInAppInfo)
}


function* getAppInfoDetail (prama) {
  const res = yield Axios.ajax({
    url: `${API.lightSignIn.secret}/${prama.data}`,
    data: prama.data,
    method: 'get'
  })
  yield put(getAppInfoDetailNewsAction(res.resData))
}

// generator 函数
function* getAppInfoNews () {
  yield takeEvery(GET_APPINFODETAIL_ACTION, getAppInfoDetail)
}

function* deleteFun (prama) {
  const res = yield Axios.ajax({
    url: `${API.lightSignIn.appInfo}/${prama.data}`,
    method: 'delete'
  })
  if (res.resCode) {
    message.info('删除成功')
  }
  message.info('This is a normal message')
  yield put(getLightSignInAppInfoAction(prama.data))
}

// generator 函数
function* deleteAppFun () {
  yield takeEvery(del_APPNEWS_ACTION, deleteFun)
}

export const oneClickLoginSagas = [
  fork(LightSignInCustomers),
  fork(LightSignInAppInfoAction),
  fork(getAppInfoNews),
  fork(deleteAppFun),
]