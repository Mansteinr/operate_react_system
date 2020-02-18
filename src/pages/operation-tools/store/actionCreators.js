// 纯函数 直接在组件中调用

import {
  IS_COLLAPSE_ACTION,
  GET_QUERYLOGS_ACTION,
  GET_QUERYLOGSLIST_ACTION
} from './actionTypes'

export const getIsCollapseAction = (data) => {
  return {
    type: IS_COLLAPSE_ACTION,
    data
  }
}
export const getQueryLogsAction = (data) => {
  return {
    type: GET_QUERYLOGS_ACTION,
    data
  }
}
export const getQueryLogsListAction = (data) => {
  return {
    type: GET_QUERYLOGSLIST_ACTION,
    data
  }
}
