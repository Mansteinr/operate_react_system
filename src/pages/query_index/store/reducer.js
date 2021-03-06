
import {
  GET_USAGEBYDAtELIST_ACTION,
  GET_USAGEBYCUSTOMERLIST_ACTION
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  UsageByDateList: [],
  UsageByCustomerList: []
})

// 

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function queryIndexReducer (state = defaultState, action) {
	switch (action.type) {
    case GET_USAGEBYDAtELIST_ACTION:
      return state.set('UsageByDateList', action.data)
    case GET_USAGEBYCUSTOMERLIST_ACTION:
      return state.set('UsageByCustomerList', action.data)
		default:
			return state
	}
}