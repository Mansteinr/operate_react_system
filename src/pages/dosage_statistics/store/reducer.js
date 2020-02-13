
import {
  GET_BALANCESNAPSHOTLIST_ACTION,
  GET_CHARGELOGLIST_ACTION,
  GET_OUTSERVICECHARGEINFOBYSUPPLIERLIST_ACTION,
  GET_USAGEBUNAMELIST_ACTION
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  outServiceChargeInfoBySupplierList: {
    dayCompanyList: [],
    serviceCompanyList: []
  },
  BalanceSnapshotList: [],
  chargeLogList: [],
  UsageByNameList: []
})

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function dosageStatisticsReducer (state = defaultState, action) {
	switch (action.type) {
    case GET_BALANCESNAPSHOTLIST_ACTION:
      return state.set('BalanceSnapshotList', action.data)
    case GET_CHARGELOGLIST_ACTION:
      return state.set('chargeLogList', action.data)
    case GET_OUTSERVICECHARGEINFOBYSUPPLIERLIST_ACTION:
      return state.merge({
        outServiceChargeInfoBySupplierList: {
          dayCompanyList: action.data.dayCompany,
          serviceCompanyList: action.data.serviceCompany
        }
      })
    case GET_USAGEBUNAMELIST_ACTION:
      return state.set('UsageByNameList', action.data)
		default:
			return state
	}
}