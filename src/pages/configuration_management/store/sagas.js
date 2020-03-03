
import API from '@/config'
import Axios from '@/axios'
import { put, takeEvery, fork } from 'redux-saga/effects'
import { 
  getAllServiceNameParamsListAction,
  deleteServiceNameAndParamAjaxAction
 } from './actionCreators'
import { 
  GET_ALLSERVICENAMEPARAMS_ACTION,
  DELETE_SERVICENAMEANDPAEAM_ACTION
 } from './actionTypes'

function* getAllServiceNameParamsList (prama) {
  const res = yield Axios.ajax({
    url: API.paramsApi.getAll,
    data: prama.data
  })
  yield put(getAllServiceNameParamsListAction(res.resData))
}

// generator 函数
function* getAllServiceNameParamsListFork () {
  yield takeEvery(GET_ALLSERVICENAMEPARAMS_ACTION, getAllServiceNameParamsList)
}
// 删除服务和参数
function* deleteServiceNameAndParam (prama) {
  let data = false
  if(prama) {
    const res = yield Axios.ajax({
      url: API.paramsApi.deleteByServiceNameAndParamName,
      data: prama.data
    })
    res.resCode === 1 ? (data = true) : (data = false)
  } else {
    data = false
  }
  
  yield put(deleteServiceNameAndParamAjaxAction(data))
}

// generator 函数
function* deleteServiceNameAndParamFork () {
  yield takeEvery(DELETE_SERVICENAMEANDPAEAM_ACTION, deleteServiceNameAndParam)
}

export const configurationSagas = [
  fork(getAllServiceNameParamsListFork),
  fork(deleteServiceNameAndParamFork),
]