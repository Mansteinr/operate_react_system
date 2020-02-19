
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { baseReducer } from '@/common/js/store' // 基础
import { navLeftReducer } from '@/components/NavLeft/store' // 左侧

import { queryIndexReducer } from '@/pages/query_index/store' // 总量统计
import { oneClickLoginReducer } from '@/pages/one_click_login/store' // 一件登录
import { dosageStatisticsReducer } from '@/pages/dosage_statistics/store' // 用量统计
import { operationReducer } from '@/pages/operation-tools/store' // 运维工具
import { configurationReducer } from '@/pages/configuration_management/store' // 运维工具

export default combineReducers({
  base: baseReducer,
  navLeft: navLeftReducer,
  queryIndex: queryIndexReducer,
  oneClickLogin: oneClickLoginReducer,
  dosageStatistics: dosageStatisticsReducer,
  operation: operationReducer,
  configuration: configurationReducer,
})
