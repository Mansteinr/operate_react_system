// 纯函数 直接在组件中调用

import {
  GET_BASEBUSINESSTYPES_ACTION,
  GET_BASEBUSINESSTYPESLIST_ACTION,
  GET_BASECURSTOMERS_ACTION,
  GET_BASECURSTOMERSLIST_ACTION,
  CHANGE_BASECURSTOMERSLIST_ACTION,
  GET_BASESERVICES_ACTION,
  GET_BASESERVICESLIST_ACTION,
  GET_SUPPLIER_ACTION,
  GET_SUPPLIERLIST_ACTION,
  CHANGE_DATERANGE_ACTION
} from './actionTypes'

// 行业类型
export const getBaseBusinessTypesAction = (data) => {
  return {
    type: GET_BASEBUSINESSTYPES_ACTION
  }
}
// 行业类型列表
export const getBaseBusinessTypesListAction = (data) => {
  return {
    type: GET_BASEBUSINESSTYPESLIST_ACTION,
    data
  }
}
// 客户名称
export const getBaseCustomersAction = () => {
  return {
    type: GET_BASECURSTOMERS_ACTION
  }
}
// 客户名称列表
export const getBaseCustomersListAction = (data) => {
  return {
    type: GET_BASECURSTOMERSLIST_ACTION,
    data
  }
}
// // 切换客户名称
export const changeBaseCustomersListAction = (data) => {
  return {
    type: CHANGE_BASECURSTOMERSLIST_ACTION,
    data
  }
}

// 服务名称
export const getBaseServicesAction = (data) => {
  return {
    type: GET_BASESERVICES_ACTION,
    data
  }
}
// 服务名称列表
export const getBaseServicesListAction = (data) => {
  return {
    type: GET_BASESERVICESLIST_ACTION,
    data
  }
}

// 供应商名称
export const getSupplierAction = (data) => {
  return {
    type: GET_SUPPLIER_ACTION
  }
}

// 供应商名称列表
export const getSupplierListAction = (data) => {
  return {
    type: GET_SUPPLIERLIST_ACTION,
    data
  }
}

// 日期切换
export const changeDateRangeAction = (data) => {
  return {
    type: CHANGE_DATERANGE_ACTION,
    data
  }
}