// 纯函数 直接在组件中调用

import {
  GET_USAGEBYDAtELIST_ACTION,
  GET_USAGEBYCUSTOMER_ACTION,
  GET_USAGEBYDATE_ACTION,
  GET_USAGEBYCUSTOMERLIST_ACTION,
} from './actionTypes'

export const getUsageByDateListAction = (data) => {
  return {
    type: GET_USAGEBYDAtELIST_ACTION,
    data
  }
}

export const getUsageByCustomerListAction = (data) => {
  return {
    type: GET_USAGEBYCUSTOMERLIST_ACTION,
    data
  }
}

export const getUsageByCustomerAction = (data) => {
  return {
    type: GET_USAGEBYCUSTOMER_ACTION,
    data
  }
}
export const getUsageByDateAction = (data) => {
  return {
    type: GET_USAGEBYDATE_ACTION,
    data
  }
}