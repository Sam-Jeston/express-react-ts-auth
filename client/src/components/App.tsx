import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { Post } from './Post'
import { Admin } from './Admin'
import { Login } from './Login'
import { Signup } from './Signup'
import { NotFound } from './NotFound'
const icon = require('../../public/management.svg')

const inactiveClasses = "navbar-menu"
const activeClasses = "navbar-menu is-active"

export class App extends React.Component<any, {active: boolean}> {
  constructor(props: any) {
    super(props)
    this.state = { active: false }
  }

  public toggleIsActive () {
    this.setState({
      active: !this.state.active
    })
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

            <div id="navMenuExample" className={this.state.active ? activeClasses : inactiveClasses}>
              <div className="navbar-start">
                <Link className="navbar-item" to="/">Home</Link>
                <Link className="navbar-item" to="/about">About</Link>
                <Link className="navbar-item" to="/admin">Admin</Link>
              </div>

              <div className="navbar-end">
                <a className="navbar-item" href="https://github.com/Sam-Jeston/rust-on-the-web" target="_blank">
                  Github
                </a>
                <Link className="navbar-item" to="/login">Login</Link>
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/posts/:id" component={Post}/>
            <Route path="/404" component={NotFound}/>
            <Redirect to="/404" />
          </Switch>
        </div>
      </Router>
    )
  }
}
