
import { combineReducers } from 'redux'

import { queryIndexReducer } from '@/pages/query_index/store'
import { navLeftReducer } from '@/components/NavLeft/store'

export default combineReducers({
  queryIndex: queryIndexReducer,
  navLeft: navLeftReducer,
})
