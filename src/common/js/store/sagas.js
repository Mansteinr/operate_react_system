
// 基础数据存储 必须请求客户等氢气

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import {
  getBaseCustomersListAction,
  getBaseBusinessTypesListAction,
  getBaseServicesListAction
} from './actionCreators'
import {
  GET_BASECURSTOMERS_ACTION,
  GET_BASEBUSINESSTYPES_ACTION,
  GET_BASESERVICES_ACTION
} from './actionTypes'

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

function* getServiceList (prama) {
  console.log(prama, 'pramapramapramapramaprama')
  const res = yield Axios.ajax({
    url: API.upApi[prama.data && prama.data.customerId ? 'hasServices' : 'services'],
    data: prama.data
  })
  yield put(getBaseServicesListAction(res.resData))
}

function* getService () {
  yield takeEvery(GET_BASESERVICES_ACTION, getServiceList)
}

export const baseSagas = [
  fork(getCustomer),
  fork(getBusinessType),
  fork(getService),
]