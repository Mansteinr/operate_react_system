
// 处理异步请求

import { put, takeEvery, fork } from 'redux-saga/effects'
import API from '@/config'
import Axios from '@/axios'
import { initMenusList } from './actionCreators'
import { INIT_MENUS_LIST } from './actionTypes'

function* queryMenusList () {
  const res = yield Axios.ajax({
    url:  API.base.querymenus,
    data: {
      systemName: '服务平台'
    }
  })
  
  yield put({
    type: INIT_MENUS_LIST,
    data: res.resData
  })
}


export const navLeftSagas = [
  fork(queryMenusList)
]