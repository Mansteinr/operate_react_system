
import API from '@/config'
import Axios from '@/axios'
import { put, takeEvery, fork } from 'redux-saga/effects'
import { getAllServiceNameParamsListAction } from './actionCreators'
import { GET_ALLSERVICENAMEPARAMS_ACTION } from './actionTypes'

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

export const configurationSagas = [
  fork(getAllServiceNameParamsListFork)
]