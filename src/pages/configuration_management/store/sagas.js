
import API from '@/config'
import Axios from '@/axios'
import { message } from 'antd'
import { put, takeEvery, fork } from 'redux-saga/effects'
import { 
  getAllServiceNameParamsAction,
  deleteServiceNameAndParamAjaxAction,
  getAllServiceNameParamsListAction
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
  try{
    let data = false
    if(prama) {
      const res = yield Axios.ajax({
        url: API.paramsApi.deleteByServiceNameAndParamName,
        data: prama.data
      })
      if(res.resCode) {
        data = true
      }
      message.success(res.resMsg[0].msgText)
      yield put(deleteServiceNameAndParamAjaxAction(data))
      yield put(getAllServiceNameParamsAction())
    } else {
      data = false
      message.warning('缺少参数')
    }
  }
  catch(err) {
    message.error(err.message)
  }
  
}

// generator 函数
function* deleteServiceNameAndParamFork () {
  yield takeEvery(DELETE_SERVICENAMEANDPAEAM_ACTION, deleteServiceNameAndParam)
}

export const configurationSagas = [
  fork(getAllServiceNameParamsListFork),
  fork(deleteServiceNameAndParamFork),
]