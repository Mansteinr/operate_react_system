
// 处理异步请求

// 组件中发送的dispatch reducer和saga都能接收到
// 对于异步请求来说 组件中dispatch先发送至 saga
// 异步完成之后 在saga在发送一个dispatch至reducer

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import {
  getQueryLogsListAction
} from './actionCreators'
import {
  GET_QUERYLOGS_ACTION,
} from './actionTypes'

// 余额快照
function* getLogs (prama) {
  const res = yield Axios.ajax({
    url: API.upApi.logs,
    data: prama.data
  })
  yield put(getQueryLogsListAction(res.resData))
}

function* getLogsFork () {
  yield takeEvery(GET_QUERYLOGS_ACTION, getLogs)
}



export const operationSagas = [
  fork(getLogsFork)
]