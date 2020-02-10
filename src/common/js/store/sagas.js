
// 基础数据存储 必须请求客户等氢气

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import { getCustomersListAction } from './actionCreators'
import { GET_CURSTOMERS_ACTION  } from './actionTypes'

function* getCustomerList (prama) {
  const res = yield Axios.ajax({
    url: API.downApi.UsageByDate,
    data: prama.data
  })
  yield put(getCustomersListAction(res.resData))
}

function* getCustomer () {
  yield takeEvery(GET_CURSTOMERS_ACTION, getCustomerList)
}

export const baseSagas = [
  fork(getCustomer)
]