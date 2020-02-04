import {
  CHANGE_MENU_ITEM,
  INIT_MENUS_LIST
} from './actionTypes'

export const getMenuItemAction = (value) => {
  return {
    type: CHANGE_MENU_ITEM,
    title: value.title,
    key: value.key,
    url: value.url
  }
}

export const initMenusList = (data) => {
  return {
    type: INIT_MENUS_LIST,
    data
  }
}

