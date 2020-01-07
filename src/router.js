import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Login from './pages/login'

export default class Router extends React.Component {
  render() {
    return(
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={ Login } />
            <Route path="/" render={() =>
              <Admin>
                <Switch>
                  {/* <Route path="/admin/ui/buttons" component={Admin}></Route> */}
                  {/* <Route component={Admin}></Route> */}
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}