// 纯函数 直接在组件中调用

import {
  GET_LIGHTSIGNIN_CUSTOMERS_ACTION,
  GET_LIGHTSIGNIN_CUSTOMERS_LIST_ACTION,
  GET_LIGHTSIGNIN_APPINFO_ACTION,
  GET_LIGHTSIGNIN_APPINFO_LIST_ACTION,
  GET_APPINFODETAIL_ACTION,
  GET_APPINFODETAILNEWS_ACTION,
  del_APPNEWS_ACTION
} from './actionTypes'

export const getLightSignInCustomersAction = () => {
  return {
    type: GET_LIGHTSIGNIN_CUSTOMERS_ACTION
  }
}

export const getLightSignInCustomersListAction = (data) => {
  return {
    type: GET_LIGHTSIGNIN_CUSTOMERS_LIST_ACTION,
    data
  }
}

export const getLightSignInAppInfoAction = (data) => {
  console.log('GET_LIGHTSIGNIN_APPINFO_ACTION', data)
  return {
    type: GET_LIGHTSIGNIN_APPINFO_ACTION,
    data
  }
}

export const getLightSignInAppInfoListAction = (data) => {
  return {
    type: GET_LIGHTSIGNIN_APPINFO_LIST_ACTION,
    data
  }
}

export const getAppInfoDetailAction = (data) => {
  return {
    type: GET_APPINFODETAIL_ACTION,
    data
  }
}

export const getAppInfoDetailNewsAction = (data) => {
  return {
    type: GET_APPINFODETAILNEWS_ACTION,
    data
  }
}

export const delAppNewsAction = (data) => {
  return {
    type: del_APPNEWS_ACTION,
    data
  }
}
