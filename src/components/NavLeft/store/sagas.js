
// 处理异步请求
// redux-saga是redux的插件  不是react的插件

import { put, fork, takeEvery } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import { INIT_MENUS_LIST } from './actionTypes'
import { initMenusListAction } from './actionCreators'

function* queryMenusList () {
  const res = yield Axios.ajax({
    url:  API.base.querymenus,
    data: {
      systemName: '服务平台'
    }
  })
  yield put(initMenusListAction(res.resData))
}

function* queryMenusListSaga () {

  yield takeEvery(INIT_MENUS_LIST, queryMenusList)
}

export const navLeftSagas = [
  fork(queryMenusListSaga)
]