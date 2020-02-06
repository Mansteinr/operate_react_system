import {
  CHANGE_MENU_ITEM,
  INIT_MENUS_LIST_ACTION
} from './actionTypes'

export const getMenuItemAction = (value) => {
  return {
    type: CHANGE_MENU_ITEM,
    title: value.name,
    key: value.id + '', // 转为字符串类型
    url: value.resourceUrl.split('/')[value.resourceUrl.split('/').length - 1].split('.html')[0]
  }
}

export const initMenusListAction = (data) => {
  return {
    type: INIT_MENUS_LIST_ACTION,
    data
  }
}

