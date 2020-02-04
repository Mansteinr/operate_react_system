
import {
	CHANGE_MENU_ITEM,
	INIT_MENUS_LIST
} from './actionTypes'

const defaultState = {
  menuTreeList: []
}

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function navLeftReducer (state = defaultState, action) {
	switch (action.type) {
    case INIT_MENUS_LIST:
			return {
				...state,
				menuTreeList: action.data
			}
		default:
			return state
	}
}