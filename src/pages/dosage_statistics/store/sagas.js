
// 处理异步请求

// 组件中发送的dispatch reducer和saga都能接收到
// 对于异步请求来说 组件中dispatch先发送至 saga
// 异步完成之后 在saga在发送一个dispatch至reducer

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import {
  getUsageByDateListAction,
  getUsageByCustomerListAction,
  getBalanceSnapshotListAction,
  getChargeLogListAction
} from './actionCreators'
import {
  GET_USAGEBYDATE_ACTION,
  GET_USAGEBYCUSTOMER_ACTION,
  GET_BALANCESNAPSHOT_ACTION,
  GET_CHARGELOG_ACTION
} from './actionTypes'

function* getUsageByDateList (prama) {
  const res = yield Axios.ajax({
    url: API.downApi.UsageByDate,
    data: prama.data
  })
  yield put(getUsageByDateListAction(res.resData))
}

function* getUsageByCustomerList (prama) {
  const res = yield Axios.ajax({
    url: API.downApi.UsageByCustomer,
    data: prama.data
  })
  yield put(getUsageByCustomerListAction(res.resData))
}


// generator 函数
function* UsageByDate () {
  yield takeEvery(GET_USAGEBYDATE_ACTION, getUsageByDateList)
}
function* UsageByCustomer () {
  yield takeEvery(GET_USAGEBYCUSTOMER_ACTION, getUsageByCustomerList)
}

// 余额快照
function* getBalanceSnapshotList (prama) {
  const res = yield Axios.ajax({
    url: API.downApi.getBalanceSnapshot,
    data: prama.data
  })
  yield put(getBalanceSnapshotListAction(res.resData))
}

function* BalanceSnapshot () {
  yield takeEvery(GET_BALANCESNAPSHOT_ACTION, getBalanceSnapshotList)
}
// 余额快照 充值记录
function* getChargeLogList (prama) {
  const res = yield Axios.ajax({
    url: `${API.downApi.chargeLog}/${prama.data}`,
    data: prama.data,
    method: 'get'
  })
  yield put(getChargeLogListAction(res.resData))
}

function* chargeLog () {
  yield takeEvery(GET_CHARGELOG_ACTION, getChargeLogList)
}

export const dosageStatisticsSagas = [
  fork(UsageByDate),
  fork(UsageByCustomer),
  fork(BalanceSnapshot),
  fork(chargeLog),
]