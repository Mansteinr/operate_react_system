import {
  CHANGE_MENU_ITEM,
  INIT_QERYINDEX_LIST,
  GET_QUERYINDEXLIST_ACTION
} from './actionTypes'

export const getMenuItemAction = (value) => {
  return {
    type: CHANGE_MENU_ITEM,
    title: value.title,
    key: value.key,
    url: value.url
  }
}

export const getQueryindexListAction = (data) =>{
  return {
    type: GET_QUERYINDEXLIST_ACTION,
    data
  }
}
export const initQueryindexList = (data) => {
  return {
    type: INIT_QERYINDEX_LIST,
    data
  }
}

