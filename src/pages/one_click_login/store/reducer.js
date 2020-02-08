
import {
  GET_LIGHTSIGNIN_CUSTOMERS_LIST_ACTION,
  GET_LIGHTSIGNIN_APPINFO_LIST_ACTION,
  GET_APPINFODETAILNEWS_ACTION
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  lightSignInCustomersList: []
})

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function oneClickLoginReducer (state = defaultState, action) {
	switch (action.type) {
    case GET_LIGHTSIGNIN_CUSTOMERS_LIST_ACTION:
      return state.set('lightSignInCustomersList', action.data)
    case GET_LIGHTSIGNIN_APPINFO_LIST_ACTION:
      return state.set('lightSignInAppInfoList', action.data)
    case GET_APPINFODETAILNEWS_ACTION:
      return state.set('appInfoNews', action.data)
		default:
			return state
	}
}