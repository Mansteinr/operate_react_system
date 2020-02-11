// 纯函数 直接在组件中调用

import {
  GET_BASEBUSINESSTYPES_ACTION,
  GET_BASEBUSINESSTYPESLIST_ACTION,
  GET_BASECURSTOMERS_ACTION,
  GET_BASECURSTOMERSLIST_ACTION
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

export const getCBaseCustomersListAction = (data) => {
  return {
    type: GET_BASECURSTOMERSLIST_ACTION,
    data
  }
}
