
// 处理异步请求

// 组件中发送的dispatch reducer和saga都能接收到
// 对于异步请求来说 组件中dispatch先发送至 saga
// 异步完成之后 在saga在发送一个dispatch至reducer

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import {
  getBalanceSnapshotListAction,
  getChargeLogListAction,
  getOutServiceChargeInfoBySupplierListAction,
  getUsageByNameListAction,
  getServiceChargeInfoListAction
} from './actionCreators'
import {
  GET_BALANCESNAPSHOT_ACTION,
  GET_CHARGELOG_ACTION,
  GET_OUTSERVICECHARGEINFOBYSUPPLIER_ACTION,
  GET_USAGEBUNAME_ACTION,
  GET_SERVICECHARGEINFO_ACTION
} from './actionTypes'

// 余额快照
function* getBalanceSnapshotList (prama) {
  if (prama.data.loginNames.length === 1 && prama.data.loginNames[0] === '') {
    prama.data.loginNames = []
  }
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
// 按供应商分析
function* getOutServiceChargeInfoBySupplierList (prama) {
  const res = yield Axios.ajax({
    url: API.upApi.getOutServiceChargeInfoBySupplier,
    data: prama.data
  })
  yield put(getOutServiceChargeInfoBySupplierListAction(res.resData))
}

function* getOutServiceChargeInfoBySupplier () {
  yield takeEvery(GET_OUTSERVICECHARGEINFOBYSUPPLIER_ACTION, getOutServiceChargeInfoBySupplierList)
}

// 按供客户分析
function* getUsageBtyNameList (prama) {
  const res = yield Axios.ajax({
    url: API.downApi.UsageByName,
    data: prama.data
  })
  yield put(getUsageByNameListAction(res.resData))
}

function* getUsageBtyName () {
  yield takeEvery(GET_USAGEBUNAME_ACTION, getUsageBtyNameList)
}

// 按服务分析 getOutServiceChargeInfo
function* getServiceChargeInfoList (prama) {
  const res = yield Axios.ajax({
    url: API.upApi.getOutServiceChargeInfo,
    data: prama.data
  })
  yield put(getServiceChargeInfoListAction(res.resData))
}

function* getServiceChargeInfo () {
  yield takeEvery(GET_SERVICECHARGEINFO_ACTION, getServiceChargeInfoList)
}

export const dosageStatisticsSagas = [
  fork(BalanceSnapshot),
  fork(chargeLog),
  fork(getOutServiceChargeInfoBySupplier),
  fork(getUsageBtyName),
  fork(getServiceChargeInfo),
]