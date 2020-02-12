
import {
  GET_USAGEBYDAtELIST_ACTION,
  GET_USAGEBYCUSTOMERLIST_ACTION,
  GET_BALANCESNAPSHOTLIST_ACTION,
  GET_CHARGELOGLIST_ACTION,
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  UsageByDateList: [],
  UsageByCustomerList: []
})

// 

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function dosageStatisticsReducer (state = defaultState, action) {
	switch (action.type) {
    case GET_USAGEBYDAtELIST_ACTION:
      return state.set('UsageByDateList', action.data)
    case GET_USAGEBYCUSTOMERLIST_ACTION:
      return state.set('UsageByCustomerList', action.data)
    case GET_BALANCESNAPSHOTLIST_ACTION:
      return state.set('BalanceSnapshotList', action.data)
    case GET_CHARGELOGLIST_ACTION:
      console.log(action.data, 'chargeLogListchargeLogListchargeLogListchargeLogListchargeLogList')
      return state.set('chargeLogList', action.data)
		default:
			return state
	}
}