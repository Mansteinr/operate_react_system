
// 处理异步请求

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import { initQueryindexList } from './actionCreators'
import { INIT_QERYINDEX_LIST } from './actionTypes'

function* getQueryindexList (prama) {
  const res = yield Axios.ajax({
    url: API.downApi.UsageByDate,
    data: prama.data
  })
  yield put(initQueryindexList(res.resData))
}


// generator 函数
function* UsageByDate () {
  yield takeEvery(INIT_QERYINDEX_LIST, getQueryindexList)
}

export const queryIndexSagas = [
  fork(UsageByDate)
]