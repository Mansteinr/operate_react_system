
// 基础数据存储 必须请求客户等氢气

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import $downFile from '@/axios/downFile'
import {
  getBaseCustomersListAction,
  getBaseBusinessTypesListAction,
  getBaseServicesListAction,
  getSupplierListAction,
  getParamsByServiceNameListAction,
  getGuidResultAction,
  getVerifyCodeImageAction,
  confirmLandingAction,
  getAllParamAjaxAction
} from './actionCreators'
import {
  GET_BASECURSTOMERS_ACTION,
  GET_BASEBUSINESSTYPES_ACTION,
  GET_BASESERVICES_ACTION,
  GET_SUPPLIER_ACTION,
  DOWNFILE_ACTION,
  GET_PARAMSBYSERVICENAME_ACTION,
  GET_GUID_ACTION,
  GET_VERIFYCODE_ACTION,
  DO_LOGIN_ACTION,
  GET_ALL_PARAM_ACTION
} from './actionTypes'
// 获取行业类型
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
// 客户列表
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
// 服务列表
function* getServiceList (prama) {
  const res = yield Axios.ajax({
    url: API.upApi[prama ? (prama.data && prama.data.customerId ? 'hasServices' : 'services') : 'services'],
    data: prama.data
  })
  yield put(getBaseServicesListAction(res.resData))
}

function* getService () {
  yield takeEvery(GET_BASESERVICES_ACTION, getServiceList)
}

// 供应商列表
function* getSupplierList () {
  const res = yield Axios.ajax({
    url: API.upApi.companys,
    data: []
  })
  yield put(getSupplierListAction(res.resData))
}

function* getSuppliers() {
  yield takeEvery(GET_SUPPLIER_ACTION, getSupplierList)
}
// 下载文件
function* getDownFile (opt) {
  yield $downFile(opt.data)
}

function* getFiles() {
  yield takeEvery(DOWNFILE_ACTION, getDownFile)
}

// 根据服务名查询参数
function* getQueryParamsName (data) {
  const res = yield Axios.ajax({
    url: API.paramsApi.queryParamsByServiceName,
    data: data.data
  })
  yield put(getParamsByServiceNameListAction(res.resData))
}

function* getQueryParamsNameList () {
  yield takeEvery(GET_PARAMSBYSERVICENAME_ACTION, getQueryParamsName)
}

// 查询Guid
function* getGuid (data) {
  const res = yield Axios.ajax({
    url: API.upApi.logDetail,
    data: {
      guid: data.data
    }
  })
  yield put(getGuidResultAction(res.resData))
}

function* getGuidFork () {
  yield takeEvery(GET_GUID_ACTION, getGuid)
}
// 获取验证码
function* getVerifyCode (data) {
  const res = yield Axios.ajax({
    url: API.base.getVerifyCode,
    data: {
      guid: data.data
    },
    method: 'get'
  })
  yield put(getVerifyCodeImageAction(res.resData))
}

function* getVerifyCodeFork () {
  yield takeEvery(GET_VERIFYCODE_ACTION, getVerifyCode)
}
// 登陆
function* doLogin (data) {
  const res = yield Axios.ajax({
    url: API.base.login,
    data: data.data
  })
  localStorage.setItem('mtk', res.resData.mtk)
  yield put(confirmLandingAction(res.resData))
}

function* doLoginFork () {
  yield takeEvery(DO_LOGIN_ACTION, doLogin)
}
// 获取所有的参数
function* getAllParamFun (data) {
  const res = yield Axios.ajax({
    url: API.paramsApi.getParam,
    data: data.data,
    method: 'get'
  })

  let newArray = []
  if(res.resData.paramInfos.length) {
    newArray = res.resData.paramInfos.map(v => {
      return {
        paramNameEn :`${v.paramNameEn}_${v.paramNameCn}`,
        paramNameCn: v.paramNameCn
      }
    })
  }
  yield put(getAllParamAjaxAction(newArray))
}

function* getAllParamFork () {
  yield takeEvery(GET_ALL_PARAM_ACTION, getAllParamFun)
}
export const baseSagas = [
  fork(getCustomer),
  fork(getBusinessType),
  fork(getService),
  fork(getSuppliers),
  fork(getFiles),
  fork(getQueryParamsNameList),
  fork(getGuidFork),
  fork(getVerifyCodeFork),
  fork(doLoginFork),
  fork(getAllParamFork),
]