import * as React from 'react'
export class WarningBanner extends React.Component<{
  title?: string,
  message: string,
  clear: Function
}, undefined> {
  render() {
    return (
      <div>
      <article className="message is-warning">
        <div className="message-header">
          <p>{this.props.title || 'Warning'}</p>
          <button className="delete" onClick={() => this.props.clear()}></button>
        </div>
        <div className="message-body">{this.props.message}</div>
      </article>
      </div>
    )
  }
}
