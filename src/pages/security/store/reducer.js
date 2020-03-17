
import {
  GET_ALL_SENSITIVE_WORD_AJAX_ACTION,
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  allSensitiveWordList: []
})

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function securityReducer (state = defaultState, action) {
	switch (action.type) {
    case GET_ALL_SENSITIVE_WORD_AJAX_ACTION:
      return state.set('allSensitiveWordList', action.data)
		default:
			return state
	}
}
