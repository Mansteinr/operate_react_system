
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { navLeftReducer } from '@/components/NavLeft/store'

import { queryIndexReducer } from '@/pages/query_index/store' // 总量统计
import { oneClickLoginReducer } from '@/pages/one_click_login/store' // 一件登录
import { dosageStatisticsReducer } from '@/pages/dosage_statistics/store' // 用量统计

export default combineReducers({
  queryIndex: queryIndexReducer,
  navLeft: navLeftReducer,
  oneClickLogin: oneClickLoginReducer,
  dosageStatistics: dosageStatisticsReducer,
})
