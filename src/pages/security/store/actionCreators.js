// 纯函数 直接在组件中调用

import {
  GET_ALL_SENSITIVE_WORD_ACTION,
  GET_ALL_SENSITIVE_WORD_AJAX_ACTION,
  DELETE_SENSITIVE_WORD_ACTION,
} from './actionTypes'

// 获取所有的敏感词
export const getAllSensitiveWordAction = () => {
  return {
    type: GET_ALL_SENSITIVE_WORD_ACTION
  }
}

export const getAllSensitiveWordAjaxAction = (data) => {
  return {
    type: GET_ALL_SENSITIVE_WORD_AJAX_ACTION,
    data
  }
}
// 删除敏感词
export const deleteSensitiveWordAction = (data) => {
  return {
    type: DELETE_SENSITIVE_WORD_ACTION,
    data
  }
}

