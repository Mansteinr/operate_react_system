import {
  CHANGE_MENU_ITEM,
  INIT_MENUS_LIST_ACTION
} from './actionTypes'

const defaultState = {
  menuTreeList: [],
  menuActive: {}
}

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function navLeftReducer (state = defaultState, action) {
  switch (action.type) {
    case INIT_MENUS_LIST_ACTION:
      return {
        ...state,
        menuTreeList: action.data
      }
    case CHANGE_MENU_ITEM:
      return {
        ...state,
        menuActive: {
          url: action.url,
          key: action.key,
          title: action.title
        }
      }
    default:
      return state
  }
}