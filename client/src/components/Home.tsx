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
    const posts: PostDef[] = await getPosts()
    this.setState({posts})
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
        <h1 className="title is-2">Rust on the Web</h1>
        <p>
          <a href="http://www.arewewebyet.org/">Are We Web Yet?</a> provides a great overview of available web technologies for Rust.
        </p>
        <br />
        <p>Here at <a href="https://rustontheweb.com/">Rust On The Web</a> I write articles about creating web applications with Rust, and all examples are built into the site!</p>
        <br />
        {this.renderPosts()}
        <br />
      </div>
    )
  }
}
