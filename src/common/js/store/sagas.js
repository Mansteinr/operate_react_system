
// 基础数据存储 必须请求客户等氢气

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import {
  getBaseCustomersListAction,
  getBaseBusinessTypesListAction,
  getBaseServicesListAction,
  getSupplierListAction
} from './actionCreators'
import {
  GET_BASECURSTOMERS_ACTION,
  GET_BASEBUSINESSTYPES_ACTION,
  GET_BASESERVICES_ACTION,
  GET_SUPPLIER_ACTION
} from './actionTypes'
// 获取行业类型
function* getbusinessTypesList (prama) {
  const res = yield Axios.ajax({
    url: API.upApi.businessTypes,
    data: prama.data
  })
  yield put(getBaseBusinessTypesListAction(res.resData))
}

function* getBusinessType () {
  yield takeEvery(GET_BASEBUSINESSTYPES_ACTION, getbusinessTypesList)
}
// 客户列表
function* getCustomerList (prama) {
  const res = yield Axios.ajax({
    url: API.upApi.customers,
    data: prama.data
  })
  yield put(getBaseCustomersListAction(res.resData))
}

function* getCustomer () {
  yield takeEvery(GET_BASECURSTOMERS_ACTION, getCustomerList)
}
// 服务列表
function* getServiceList (prama) {
  const res = yield Axios.ajax({
    url: API.upApi[prama ? (prama.data && prama.data.customerId ? 'hasServices' : 'services') : 'services'],
    data: prama.data
  })
  yield put(getBaseServicesListAction(res.resData))
}

function* getService () {
  yield takeEvery(GET_BASESERVICES_ACTION, getServiceList)
}

// 供应商列表
function* getSupplierList () {
  const res = yield Axios.ajax({
    url: API.upApi.companys,
    data: []
  })
  yield put(getSupplierListAction(res.resData))
}

function* getSuppliers() {
  yield takeEvery(GET_SUPPLIER_ACTION, getSupplierList)
}

export const baseSagas = [
  fork(getCustomer),
  fork(getBusinessType),
  fork(getService),
  fork(getSuppliers),
]