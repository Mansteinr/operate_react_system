
import {
  GET_BASECURSTOMERSLIST_ACTION,
  GET_BASEBUSINESSTYPESLIST_ACTION,
  CHANGE_BASECURSTOMERSLIST_ACTION,
  GET_BASESERVICESLIST_ACTION,
  GET_SUPPLIERLIST_ACTION,
  CHANGE_DATERANGE_ACTION
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  customersList: []
})

// 

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function baseReducer (state = defaultState, action) {
	switch (action.type) {
    case GET_BASECURSTOMERSLIST_ACTION:
      return state.set('baseCustomersList', action.data)
    case GET_BASEBUSINESSTYPESLIST_ACTION:
      return state.set('baseBusinessTypesList', action.data)
    case GET_BASESERVICESLIST_ACTION:
      return state.set('baseServiceList', action.data)
    case GET_SUPPLIERLIST_ACTION:
      return state.set('supplierList', action.data)
    case CHANGE_DATERANGE_ACTION:
      return state.set('changeDate', action.data)
    case CHANGE_BASECURSTOMERSLIST_ACTION:
      let data = state.getIn(['baseCustomersList']), arrData = []
      
      if (!action.data) {
        arrData = [...data]
      } else {
        data.map(v => {
          if (v.businessId === action.data) {
            arrData.push(v)
          }
        })
      }
      return state.set('baseCustomersList', arrData)
		default:
			return state
	}
}