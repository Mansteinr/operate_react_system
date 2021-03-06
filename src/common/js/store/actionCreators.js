// 纯函数 直接在组件中调用

import {
  GET_BASEBUSINESSTYPES_ACTION,
  GET_BASEBUSINESSTYPESLIST_ACTION,
  GET_BASECURSTOMERS_ACTION,
  GET_BASECURSTOMERSLIST_ACTION,
  CHANGE_BASECURSTOMERSLIST_ACTION,
  GET_BASESERVICES_ACTION,
  GET_BASESERVICESLIST_ACTION,
  GET_SUPPLIER_ACTION,
  GET_SUPPLIERLIST_ACTION,
  CHANGE_DATERANGE_ACTION,
  DOWNFILE_ACTION,
  GET_PARAMSBYSERVICENAME_ACTION,
  GET_PARAMSBYSERVICENAMELIST_ACTION,
  GET_GUID_ACTION,
  GET_GUIDRESULT_ACTION,
  GET_VERIFYCODE_ACTION,
  GET_VERIFYCODEIMAGE_ACTION,
  DO_LOGIN_ACTION,
  CONFIRM_LANDING_ACTION,
  GET_ALL_PARAM_ACTION,
  GET_ALL_PARAM_AJAX_ACTION
} from './actionTypes'

// 行业类型
export const getBaseBusinessTypesAction = (data) => {
  return {
    type: GET_BASEBUSINESSTYPES_ACTION
  }
}
// 行业类型列表
export const getBaseBusinessTypesListAction = (data) => {
  return {
    type: GET_BASEBUSINESSTYPESLIST_ACTION,
    data
  }
}
// 客户名称
export const getBaseCustomersAction = () => {
  return {
    type: GET_BASECURSTOMERS_ACTION
  }
}
// 客户名称列表
export const getBaseCustomersListAction = (data) => {
  return {
    type: GET_BASECURSTOMERSLIST_ACTION,
    data
  }
}
// // 切换客户名称
export const changeBaseCustomersListAction = (data) => {
  return {
    type: CHANGE_BASECURSTOMERSLIST_ACTION,
    data
  }
}

// 服务名称
export const getBaseServicesAction = (data) => {
  return {
    type: GET_BASESERVICES_ACTION,
    data
  }
}
// 服务名称列表
export const getBaseServicesListAction = (data) => {
  return {
    type: GET_BASESERVICESLIST_ACTION,
    data
  }
}
// 供应商名称
export const getSupplierAction = (data) => {
  return {
    type: GET_SUPPLIER_ACTION
  }
}
// 供应商名称列表
export const getSupplierListAction = (data) => {
  return {
    type: GET_SUPPLIERLIST_ACTION,
    data
  }
}
// 日期切换
export const changeDateRangeAction = (data) => {
  return {
    type: CHANGE_DATERANGE_ACTION,
    data
  }
}
// 下载文件
export const downFileAction = (data) => {
  return {
    type: DOWNFILE_ACTION,
    data
  }
}

// 服务名切换jua
export const getParamsByServiceNameAction = (data) => {
  return {
    type: GET_PARAMSBYSERVICENAME_ACTION,
    data
  }
}
// 
export const getParamsByServiceNameListAction = (data) => {
  return {
    type: GET_PARAMSBYSERVICENAMELIST_ACTION,
    data
  }
}


export const getGuidResultAction = (data) => {
  return {
    type: GET_GUIDRESULT_ACTION,
    data
  }
}
// 查询guid
export const getGuidAction = (data) => {
  return {
    type: GET_GUID_ACTION,
    data
  }
}
// 获取验证码
export const getVerifyCodeAction = (data) => {
  return {
    type: GET_VERIFYCODE_ACTION,
    data
  }
}

export const getVerifyCodeImageAction = (data) => {
  return {
    type: GET_VERIFYCODEIMAGE_ACTION,
    data
  }
}
// 登陆
export const doLoginAction = (data) => {
  return {
    type: DO_LOGIN_ACTION,
    data
  }
}
export const confirmLandingAction = (data) => {
  return {
    type: CONFIRM_LANDING_ACTION,
    data
  }
}

// 获取所有的参数
export const getAllParamAction = (data) => {
  return {
    type: GET_ALL_PARAM_ACTION
  }
}
export const getAllParamAjaxAction = (data) => {
  return {
    type: GET_ALL_PARAM_AJAX_ACTION,
    data
  }
}