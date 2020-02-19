
import {
  IS_COLLAPSE_ACTION,
  GET_QUERYLOGSLIST_ACTION,
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  isCollapse: false
})

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function operationReducer (state = defaultState, action) {
	switch (action.type) {
    case IS_COLLAPSE_ACTION:
      return state.set('isCollapse', action.data)
    case GET_QUERYLOGSLIST_ACTION:
      return state.set('logsList', action.data)
		default:
			return state
	}
}