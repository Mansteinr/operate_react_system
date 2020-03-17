
import API from '@/config'
import Axios from '@/axios'
import { message } from 'antd'
import { put, takeEvery, fork } from 'redux-saga/effects'
import { 
  GET_ALL_SENSITIVE_WORD_ACTION,
  DELETE_SENSITIVE_WORD_ACTION,
 } from './actionTypes'
import { 
  deleteSensitiveWordAjaxAction,
  getAllSensitiveWordAjaxAction,
  getAllSensitiveWordAction,
 } from './actionCreators'

// 获取所有的敏感词
function* getAllSensitiveWordFun (prama) {
  const res = yield Axios.ajax({
    url: API.secureApi.allWords,
    data: prama.data
  })
  yield put(getAllSensitiveWordAjaxAction(res.resData))
}

// generator 函数
function* getAllSensitiveWordFork () {
  yield takeEvery(GET_ALL_SENSITIVE_WORD_ACTION, getAllSensitiveWordFun)
}
// 删除的敏感词
function* deleteSensitiveWordFun (prama) {
  let data = false
  const res = yield Axios.ajax({
    url: API.secureApi.wordDelete,
    data: prama.data
  })
  if(res.resCode) {
    yield put(getAllSensitiveWordAction())
    data = true
    message.success(res.resMsg[0].msgText)
  } else {
    data = false
    message.success(res.resMsg[0].msgText)
  }
}

// generator 函数
function* deleteSensitiveWordFork () {
  yield takeEvery(DELETE_SENSITIVE_WORD_ACTION, deleteSensitiveWordFun)
}


export const securitySagas = [
  fork(getAllSensitiveWordFork),
  fork(deleteSensitiveWordFork),
]