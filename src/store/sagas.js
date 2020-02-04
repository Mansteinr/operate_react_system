import { all } from 'redux-saga/effects'
import { queryIndexSagas } from '@/pages/query_index/store'
import { navLeftSagas } from '@/components/NavLeft/store'


export default function* sagas() {
  yield all([
    ...queryIndexSagas,
    ...navLeftSagas
  ])
}
