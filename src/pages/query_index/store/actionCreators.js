import {
  INIT_QERYINDEX_LIST,
} from './actionTypes'

export const initQueryindexList = (data) => {
  return {
    type: INIT_QERYINDEX_LIST,
    data
  }
}

