import * as React from "react";
import { getPosts } from '../services/posts'

export class Home extends React.Component<any, HomeState> {
  constructor(props: any) {
    super(props)
    this.renderPosts = this.renderPosts.bind(this)
    this.state = { posts: [] }
  }

  public navigate(targetId: number) {
    this.props.history.push(`/posts/${targetId}`)
  }

  public async componentDidMount () {
    this.setState({posts: []})
  }

  public renderPosts () {
    return this.state.posts.map((p: PostDef) => {
      return (
        <div id={p.id.toString()} key={p.id.toString()} className="box" style={{cursor: 'pointer'}} onClick={() => this.navigate(p.id)}>
          <h2 className="title is-4">{p.title}</h2>
          <p>{p.caption}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container">
        <h1 className="title is-2">Express React Starter</h1>
      </div>
    )
  }
}
