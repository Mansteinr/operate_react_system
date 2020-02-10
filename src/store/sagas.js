import { all } from 'redux-saga/effects'
import { navLeftSagas } from '@/components/NavLeft/store'

import { queryIndexSagas } from '@/pages/query_index/store' // 总量统计
import { oneClickLoginSagas } from '@/pages/one_click_login/store' // 一键登录
import { dosageStatisticsSagas } from '@/pages/dosage_statistics/store' // 用量统计


export default function* sagas() {
  yield all([
    ...queryIndexSagas,
    ...navLeftSagas,
    ...oneClickLoginSagas,
    ...dosageStatisticsSagas
  ])
}
