import {
  CHANGE_MENU_ITEM,
  INIT_MENUS_LIST_ACTION
} from './actionTypes'
// 引入immutable 保证数据的不可变
import { fromJS } from 'immutable'

// 引入immutable前写法
// const defaultState = {
//   menuTreeList: [],
//   menuActive: {}
// }

// 引入immutable后写法
const defaultState = fromJS({
  menuTreeList: [],
  menuActive: {}
})

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function navLeftReducer (state = defaultState, action) {
  switch (action.type) {
    case INIT_MENUS_LIST_ACTION:
      // 引入immutable后写法
      // immutable对象的set方法 会结合之前的immutable对象的值 和 设置的值，返回一个全新的对象
      return state.set('menuTreeList', action.data)
      // return { // 引入immutable钱写法
      //   ...state,
      //   menuTreeList: action.data
      // }
    case CHANGE_MENU_ITEM:
      return state.set('menuActive', {
        url: action.url,
        key: action.key,
        title: action.title
      })
    default:
      return state
  }
}