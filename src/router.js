import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from './admin'
import Login from './pages/login'
// 总量统计
import QueryIndex from './pages/query_index'
// 一件登录
import oneClickLogin from './pages/one_click_login' // 一件登录
import oneClickLoginDetail from './pages/one_click_login/detail' // 一键登录详情页面
import oneClickLoginAdd from './pages/one_click_login/add' //  一键登录新增页面
// 用量统计
import queryUsage from './pages/dosage_statistics/query_usage' // 客户用量统计页面

import NotMatch from './pages/notMatch'
import Demo from './pages/demo'

export default class Router extends React.Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/" render={() =>
            <Admin>
              <Switch>
                <Route exact path="/" component={ QueryIndex }></Route>
                <Route path="/query_index" component={ QueryIndex }></Route>
                <Route path="/one_click_login" component={ oneClickLogin }></Route>
                <Route path="/oneClickLoginDetail/:id" component={ oneClickLoginDetail }></Route>
                <Route path="/oneClickLoginAdd/:id" component={ oneClickLoginAdd }></Route>
                <Route path="/query_usage" component={ queryUsage }></Route>
                <Route path="/demo" component={ Demo }></Route>
                <Route component={NotMatch}></Route>
              </Switch>
            </Admin>
          } />
        </Switch>
      </HashRouter>
    )
  }
}