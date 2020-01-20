// 处理异步请求

import { put, takeEvery } from 'redux-saga/effects'
import API from '../config'
import Axios from '../axios'
import { getQueryindexListAction } from './actionCreators'
import { INIT_QERYINDEX_LIST } from './actionTypes'

function* getQueryindexList(prama) {
  const res = yield Axios.ajax({
    url: API.downApi.UsageByDate,
    data: prama.data
  })
  yield put(getQueryindexListAction(res.resData))
}


// generator 函数
function* mySaga() {
  yield takeEvery(INIT_QERYINDEX_LIST, getQueryindexList)
}

export default mySaga