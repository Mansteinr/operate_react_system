// 纯函数 直接在组件中调用

import {
  GET_BASEBUSINESSTYPES_ACTION,
  GET_BASEBUSINESSTYPESLIST_ACTION,
  GET_BASECURSTOMERS_ACTION,
  GET_BASECURSTOMERSLIST_ACTION,
  CHANGE_BASECURSTOMERSLIST_ACTION,
  GET_BASESERVICES_ACTION,
  GET_BASESERVICESLIST_ACTION,

} from './actionTypes'

export const getBaseBusinessTypesAction = (data) => {
  return {
    type: GET_BASEBUSINESSTYPES_ACTION
  }
}

export const getBaseBusinessTypesListAction = (data) => {
  return {
    type: GET_BASEBUSINESSTYPESLIST_ACTION,
    data
  }
}

export const getBaseCustomersAction = () => {
  return {
    type: GET_BASECURSTOMERS_ACTION
  }
}

export const getBaseCustomersListAction = (data) => {
  return {
    type: GET_BASECURSTOMERSLIST_ACTION,
    data
  }
}

export const changeBaseCustomersListAction = (data) => {
  return {
    type: CHANGE_BASECURSTOMERSLIST_ACTION,
    data
  }
}


export const getBaseServicesAction = (data) => {
  return {
    type: GET_BASESERVICES_ACTION,
    data
  }
}

export const getBaseServicesListAction = (data) => {
  return {
    type: GET_BASESERVICESLIST_ACTION,
    data
  }
}