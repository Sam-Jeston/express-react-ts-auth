import * as React from 'react'
import { Link } from 'react-router-dom'
import { login } from '../services/authentication'
import { WarningBanner } from '../presentations/Warning'

export class Login extends React.Component<any, {email: string, password: string, banner: string}> {
  constructor(props: any) {
    super(props)
    this.login = this.login.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      banner: '',
      email: '',
      password: ''
    }
  }

  public login (e: any) {
    e.preventDefault()
    login(this.state.email, this.state.password).then(() => {
      this.props.evaluateAuthentication()
      this.props.history.push('/')
    }).catch((e: any) => {
      // TODO: Make this a factory
      this.setState({banner: e.response.data.message})
    })
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
            <label className="label">Email</label>
            <p className="control">
              <input className="input" name="email" type="text" placeholder="Email" onChange={this.handleInputChange} />
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
        {this.state.banner && <WarningBanner message={this.state.banner} clear={() => this.setState({banner: ''})}/>}
      </div>
    )
  }
}
