import { CHANGE_MENU_ITEM } from './actionTypes'

const defaultState = {
  title: '',
  key: '',
  url: ''
}

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export default (state = defaultState, action) => {
	if (action.type === CHANGE_MENU_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
		newState.title = action.title
		newState.key = action.key
		newState.url = action.url
		return newState
	}
	return state
}