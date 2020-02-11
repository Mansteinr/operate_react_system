
import {
  GET_BASECURSTOMERSLIST_ACTION,
  GET_BASEBUSINESSTYPESLIST_ACTION
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  customersList: []
})

// 

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function baseReducer (state = defaultState, action) {
	switch (action.type) {
    case GET_BASECURSTOMERSLIST_ACTION:
      return state.set('baseCustomersList', action.data)
    case GET_BASEBUSINESSTYPESLIST_ACTION:
      console.log(action, 'actionactionactionactionactionactionaction')
      return state.set('baseBusinessTypesList', action.data)
		default:
			return state
	}
}