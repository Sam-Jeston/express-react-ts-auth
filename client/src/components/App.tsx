import * as React from 'react'
import { assign } from 'lodash'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { Login } from './Login'
import { Logout } from './Logout'
import { Signup } from './Signup'
import { NotFound } from './NotFound'
import { cookieParser } from '../services/cookieParser'

const icon = require('../../public/management.svg')

const inactiveClasses = "navbar-menu"
const activeClasses = "navbar-menu is-active"

export function isAuthenticated() {
  const cookies = document.cookie
  const parsedCookies = cookieParser(cookies)
  if (!parsedCookies.appSession) {
    return false
  }

  return true
}

export class App extends React.Component<any, {active: boolean, authenticated: boolean}> {
  constructor(props: any) {
    super(props)
    this.state = { active: false, authenticated: isAuthenticated() }
    this.evaluateAuthentication = this.evaluateAuthentication.bind(this)
  }

  public toggleIsActive () {
    this.setState({
      active: !this.state.active
    })
  }

  public evaluateAuthentication() {
    const authenticated = isAuthenticated()
    this.setState({authenticated})
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar is-transparent">
            <div className="navbar-brand">
              <a className="navbar-item" href="https://google.com">
                <object data={`${icon}`} type="image/svg+xml" width="70px" height="52px"></object>
              </a>

              <div className="navbar-burger burger" data-target="navMenuExample" onClick={ () => this.toggleIsActive() }>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div id="navMenuExample" className={this.state.active ? activeClasses : inactiveClasses} onClick={ () => this.toggleIsActive() }>
              {this.state.authenticated && (
                <div className="navbar-start">
                  <Link className="navbar-item" to="/">Home</Link>
                  <Link className="navbar-item" to="/about">About</Link>
                </div>
              )}

              <div className="navbar-end">
                <a className="navbar-item" href="https://github.com/Sam-Jeston/express-react-ts-auth" target="_blank">
                  Github
                </a>
                {this.state.authenticated ? (
                  <Link className="navbar-item" to="/logout">Logout</Link>
                ) : (
                  <Link className="navbar-item" to="/login">Login</Link>
                )}
              </div>
            </div>
          </nav>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/about" component={About} />
            <PropsRoute path="/login" component={Login} evaluateAuthentication={this.evaluateAuthentication} />
            <PropsRoute path="/logout" component={Logout} evaluateAuthentication={this.evaluateAuthentication} />
            <PropsRoute path="/signup" component={Signup} evaluateAuthentication={this.evaluateAuthentication} />
            <Route path="/404" component={NotFound}/>
            <Redirect to="/404" />
          </Switch>
        </div>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const renderMergedProps = (component: any, ...rest: any[]) => {
  const finalProps = assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  )
}

const PropsRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(Component, routeProps, rest)
    }}/>
  )
}
