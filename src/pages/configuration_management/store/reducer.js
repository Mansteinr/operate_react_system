
import {
  GET_ALLSERVICENAMEPARAMSLIST_ACTION,
  DELETE_SERVICENAMEANDPAEAMAJAX_ACTION,
  ADD_PARAM_AJAX_ACTION,
} from './actionTypes'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  allServiceNameParamsList: [],
  addServiceNameParamFlag: false,
  deleteServiceNameParamFlag: false
})

// reducer 可以接受state，但是绝不能修改state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
export function configurationReducer (state = defaultState, action) {
	switch (action.type) {
    case GET_ALLSERVICENAMEPARAMSLIST_ACTION:
      return state.set('allServiceNameParamsList', action.data)
    case DELETE_SERVICENAMEANDPAEAMAJAX_ACTION:
      return state.set('deleteServiceNameParamFlag', action.data)
    case ADD_PARAM_AJAX_ACTION:
      return state.set('addServiceNameParamFlag', action.data)
		default:
			return state
	}
}
