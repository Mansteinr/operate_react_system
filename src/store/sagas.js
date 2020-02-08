import { all } from 'redux-saga/effects'
import { navLeftSagas } from '@/components/NavLeft/store'

import { queryIndexSagas } from '@/pages/query_index/store'
import { oneClickLoginSagas } from '@/pages/one_click_login/store'


export default function* sagas() {
  yield all([
    ...queryIndexSagas,
    ...navLeftSagas,
    ...oneClickLoginSagas
  ])
}
