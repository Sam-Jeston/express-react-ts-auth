import * as React from "react";
import { getPost } from '../services/posts'

export class Post extends React.Component<any, {post: PostDef, postId: number}> {
  constructor(props: any) {
    super(props)
    const split = this.props.location.pathname.split('/')
    const splitLength = split.length
    this.state = { post: {} as PostDef, postId: split[splitLength - 1] }
  }

  public async componentDidMount () {
    const post: PostDef = await getPost(this.state.postId)
    this.setState({post})
  }

  render() {
    return (
      <div className="container">
        <h1 className="title is-2">{this.state.post.title}</h1>
        <div className="content" dangerouslySetInnerHTML={{__html: this.state.post.body}}/>
      </div>
    )
  }
}
