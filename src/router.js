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
import queryFinance from './pages/dosage_statistics/query_finance' // 余额快照
import queryUpstreamSupplier from './pages/dosage_statistics/query_upstream_supplier' // 按供应商分析
import queryDownstreamCustomer from './pages/dosage_statistics/query_downstream_customer' // 下游客户分析
import queryUpstreamService from './pages/dosage_statistics/query_upstream_service' // 按服务分析
import queryUpstreamServiceByDay from './pages/dosage_statistics/query_upstream_serviceByDay' // 按日服务分析
import configureinterfaceParameter from './pages/configuration_management/configureinterface_parameter' // 配置管理

// 运维工具
import queryLogs from './pages/operation-tools/query_logs' // 查询日志

// 安全中心
import sensitiveWord from './pages/security/sensitive_word'

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
                <Route path="/query_finance" component={ queryFinance }></Route>
                <Route path="/query_upstream_supplier" component={ queryUpstreamSupplier }></Route>
                <Route path="/query_downstream_customer" component={ queryDownstreamCustomer }></Route>
                <Route path="/query_upstream_service" component={ queryUpstreamService }></Route>
                <Route path="/query_upstream_serviceByData" component={ queryUpstreamServiceByDay }></Route>
                <Route path="/query_logs" component={ queryLogs }></Route>
                <Route path="/interface_parameter_maintenance" component={ configureinterfaceParameter }></Route>
                <Route path="/sensitive_word" component={ sensitiveWord }></Route>
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