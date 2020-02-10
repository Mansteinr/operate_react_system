// 纯函数 直接在组件中调用

import {
  GET_CURSTOMERS_ACTION,
  GET_CURSTOMERSLIST_ACTION
} from './actionTypes'

export const getCustomersAction = (data) => {
  return {
    type: GET_CURSTOMERS_ACTION,
    data
  }
}

export const getCustomersListAction = (data) => {
  return {
    type: GET_CURSTOMERSLIST_ACTION,
    data
  }
}
