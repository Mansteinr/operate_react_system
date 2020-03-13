import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
// Provider react-redux的内容
ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>, document.getElementById('root'))
