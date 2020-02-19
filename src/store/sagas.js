import { all } from 'redux-saga/effects'

import { navLeftSagas } from '@/components/NavLeft/store' // 左侧
import { baseSagas } from '@/common/js/store' // 基础请求

import { queryIndexSagas } from '@/pages/query_index/store' // 总量统计
import { oneClickLoginSagas } from '@/pages/one_click_login/store' // 一键登录
import { dosageStatisticsSagas } from '@/pages/dosage_statistics/store' // 用量统计
import { operationSagas } from '@/pages/operation-tools/store' // 用量统计
import { configurationSagas } from '@/pages/configuration_management/store' // 配置管理


export default function* sagas() {
  yield all([
    ...baseSagas,
    ...queryIndexSagas,
    ...navLeftSagas,
    ...oneClickLoginSagas,
    ...dosageStatisticsSagas,
    ...operationSagas,
    ...configurationSagas,
  ])
}
