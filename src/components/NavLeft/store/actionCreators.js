import {
  CHANGE_MENU_ITEM,
  INIT_MENUS_LIST,
  INIT_MENUS_LIST_ACTION
} from './actionTypes'

// export const getMenuItemAction = (value) => {
//   return {
//     type: CHANGE_MENU_ITEM,
//     title: value.title,
//     key: value.key,
//     url: value.url
//   }
// }

export const initMenusListAction = (data) => {
  return {
    type: INIT_MENUS_LIST_ACTION,
    data
  }
}

