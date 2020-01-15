import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from './admin'
import Login from './pages/login'
import NotMatch from './pages/notMatch'

export default class Router extends React.Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/" render={() =>
            <Admin>
              <Switch>
                <Route path="/admin/ui/buttons" component={NotMatch}></Route>
                <Route component={NotMatch}></Route>
              </Switch>
            </Admin>
          } />
        </Switch>
      </HashRouter>
    )
  }
}