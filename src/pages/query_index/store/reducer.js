
import {
	INIT_QERYINDEX_LIST
} from './actionTypes'

const defaultState = {
	UsageByDateList: []
}

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function queryIndexReducer (state = defaultState, action) {
	switch (action.type) {
		case INIT_QERYINDEX_LIST:
			return {
				...state,
				UsageByDateList: action.data
			}
		default:
			return state
	}
}