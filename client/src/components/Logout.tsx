import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { deleteCookie } from '../services/cookieParser'

// This feels hacky, so it probably is
export class Logout extends React.Component<any, undefined> {
  constructor (props: any) {
    super(props)
    deleteCookie('userId')
  }

  // React says this is an anti-pattern
  public componentWillMount () {
    this.props.evaluateAuthentication()
  }

  render() {
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }}/>
    )
  }
}
