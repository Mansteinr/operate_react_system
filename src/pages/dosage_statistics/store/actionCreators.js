// 纯函数 直接在组件中调用

import {
  GET_USAGEBYDAtELIST_ACTION,
  GET_USAGEBYCUSTOMER_ACTION,
  GET_USAGEBYDATE_ACTION,
  GET_USAGEBYCUSTOMERLIST_ACTION,
  GET_BALANCESNAPSHOT_ACTION,
  GET_BALANCESNAPSHOTLIST_ACTION,
  GET_CHARGELOG_ACTION,
  GET_CHARGELOGLIST_ACTION,
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

// 余额快照
export const getBalanceSnapshotAction = (data) => {
  return {
    type: GET_BALANCESNAPSHOT_ACTION,
    data
  }
}

export const getBalanceSnapshotListAction = (data) => {
  return {
    type: GET_BALANCESNAPSHOTLIST_ACTION,
    data
  }
}
// 余额快照 充值记录
export const getChargeLogAction = (data) => {
  return {
    type: GET_CHARGELOG_ACTION,
    data
  }
}

export const getChargeLogListAction = (data) => {
  return {
    type: GET_CHARGELOGLIST_ACTION,
    data
  }
}