import {
	CHANGE_MENU_ITEM,
	GET_QUERYINDEXLIST_ACTION,
	INIT_QERYINDEX_LIST
} from './actionTypes'

const defaultState = {
	menuActive: {
		title: '',
		key: '',
		url: ''
	},
	queryIndex: {},
	UsageByDateList: []
}

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export default (state = defaultState, action) => {
	switch (action.type) {
		case CHANGE_MENU_ITEM: {
			return {
				...state,
				menuActive: {
					title: action.title,
					key: action.key,
					url: action.url
				}
			}
		}
		case GET_QUERYINDEXLIST_ACTION:
			return {
				...state,
				UsageByDateList: action.data
			}
		case INIT_QERYINDEX_LIST:
			return {
				...state,
				queryIndex: action.data
			}
		default:
			return state
	}
}