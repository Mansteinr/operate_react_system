// 纯函数 直接在组件中调用

import {
  GET_ALLSERVICENAMEPARAMS_ACTION,
  GET_ALLSERVICENAMEPARAMSLIST_ACTION,
} from './actionTypes'

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
