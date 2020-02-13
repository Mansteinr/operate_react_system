// 纯函数 直接在组件中调用

import {
  GET_BALANCESNAPSHOT_ACTION,
  GET_BALANCESNAPSHOTLIST_ACTION,
  GET_CHARGELOG_ACTION,
  GET_CHARGELOGLIST_ACTION,
  GET_OUTSERVICECHARGEINFOBYSUPPLIER_ACTION,
  GET_OUTSERVICECHARGEINFOBYSUPPLIERLIST_ACTION,
  GET_USAGEBUNAME_ACTION,
  GET_USAGEBUNAMELIST_ACTION
} from './actionTypes'

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

// 按供应商分析
export const getOutServiceChargeInfoBySupplierAction = (data) => {
  return {
    type: GET_OUTSERVICECHARGEINFOBYSUPPLIER_ACTION,
    data
  }
}

export const getOutServiceChargeInfoBySupplierListAction = (data) => {
  return {
    type: GET_OUTSERVICECHARGEINFOBYSUPPLIERLIST_ACTION,
    data
  }
}
// 按供客户分析
export const getUsageByNameAction = (data) => {
  return {
    type: GET_USAGEBUNAME_ACTION,
    data
  }
}

export const getUsageByNameListAction = (data) => {
  return {
    type: GET_USAGEBUNAMELIST_ACTION,
    data
  }
}