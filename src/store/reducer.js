
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { navLeftReducer } from '@/components/NavLeft/store'

import { queryIndexReducer } from '@/pages/query_index/store'
import { oneClickLoginReducer } from '@/pages/one_click_login/store'

export default combineReducers({
  queryIndex: queryIndexReducer,
  navLeft: navLeftReducer,
  oneClickLogin: oneClickLoginReducer,
})
