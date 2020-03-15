// 纯函数 直接在组件中调用

import {
  GET_ALLSERVICENAMEPARAMS_ACTION,
  GET_ALLSERVICENAMEPARAMSLIST_ACTION,
  DELETE_SERVICENAMEANDPAEAM_ACTION,
  DELETE_SERVICENAMEANDPAEAMAJAX_ACTION
} from './actionTypes'

// 获取所有的服务和参数
export const getAllServiceNameParamsAction = (data) => {
  return {
    type: GET_ALLSERVICENAMEPARAMS_ACTION,
    data
  }
}

export const getAllServiceNameParamsListAction = (data) => {
  return {
    type: GET_ALLSERVICENAMEPARAMSLIST_ACTION,
    data
  }
}

// 删除服务和参数
export const deleteServiceNameAndParamAction = (data) => {
  return {
    type: DELETE_SERVICENAMEANDPAEAM_ACTION,
    data
  }
}

export const deleteServiceNameAndParamAjaxAction = (data) => {
  return {
    type: DELETE_SERVICENAMEANDPAEAMAJAX_ACTION,
    data
  }
}
