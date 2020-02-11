
// 基础数据存储 必须请求客户等氢气

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import {
  getCBaseCustomersListAction,
  getBaseBusinessTypesListAction
} from './actionCreators'
import {
  GET_BASECURSTOMERS_ACTION,
  GET_BASEBUSINESSTYPES_ACTION
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
  yield put(getCBaseCustomersListAction(res.resData))
}

function* getCustomer () {
  yield takeEvery(GET_BASECURSTOMERS_ACTION, getCustomerList)
}

export const baseSagas = [
  fork(getCustomer),
  fork(getBusinessType),
]