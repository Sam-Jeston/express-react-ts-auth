import * as React from 'react'
import { Link } from 'react-router-dom'
import { login } from '../services/authentication'

export class Login extends React.Component<any, {username: string, password: string}> {
  constructor(props: any) {
    super(props)
    this.login = this.login.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  public login (e: any) {
    e.preventDefault()
    return login(this.state.username, this.state.password)
  }

  public handleInputChange(event: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="title is-2">Login</h2>
        <form>
          <div className="field">
            <label className="label">Username</label>
            <p className="control">
              <input className="input" name="username" type="text" placeholder="Username" onChange={this.handleInputChange} />
            </p>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <p className="control">
              <input className="input" name="password" type="password" placeholder="Password" onChange={this.handleInputChange} />
            </p>
          </div>
          <input className="button is-primary" type="submit" value="Submit" onClick={this.login} onSubmit={this.login}/>
        </form>
        <Link className="" to="/signup">Signup?</Link>
      </div>
    )
  }
}
