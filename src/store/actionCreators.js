import { CHANGE_MENU_ITEM } from './actionTypes'

export const getMenuItemAction = (value) => ({
  type: CHANGE_MENU_ITEM,
  title: value.title,
  key: value.key,
  url: value.url
})