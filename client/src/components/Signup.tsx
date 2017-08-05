import * as React from 'react'
import { signup } from '../services/authentication'
import { WarningBanner } from '../presentations/Warning'

export class Signup extends React.Component<any, {
  username: string,
  password: string,
  confirmPassword: string,
  banner: string
}> {
  constructor(props: any) {
    super(props)
    this.signup = this.signup.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = { banner: '', username: '', password: '', confirmPassword: ''}
  }

  public signup (e: any) {
    e.preventDefault()

    if (this.state.username === '') {
      this.setState({banner: 'A username must be provided'})
      return
    }

    if (this.state.password === '' || this.state.confirmPassword === '') {
      this.setState({banner: 'Please fill in both password fields'})
      return
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({banner: 'Passwords do not match'})
      return
    }

    return signup(this.state.username, this.state.password, this.state.confirmPassword)
  }

  public handleInputChange(event: any) {
    this.setState({banner: ''})
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
        <h2 className="title is-2">Signup</h2>
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
          <div className="field">
            <label className="label">Confirm Password</label>
            <p className="control">
              <input className="input" name="confirmPassword" type="password" placeholder="Retype Password" onChange={this.handleInputChange} />
            </p>
          </div>
          <input className="button is-primary" type="submit" value="Submit" onClick={this.signup} onSubmit={this.signup}/>
        </form>
        {this.state.banner && <WarningBanner message={this.state.banner} clear={() => this.setState({banner: ''})}/>}
      </div>
    )
  }
}
