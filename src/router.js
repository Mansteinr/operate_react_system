import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from './admin'
import Login from './pages/login'
import QueryIndex from './pages/query_index'
import oneClickLogin from './pages/one_click_login'
import oneClickLoginDetail from './pages/one_click_login/detail'
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