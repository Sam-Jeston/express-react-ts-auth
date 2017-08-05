import * as React from "react";
import { createPost } from '../services/posts'
const ReactQuill = require('react-quill')
const theme = require('react-quill/dist/quill.snow.css')

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean'],
    ['code-block']
  ]
}

export class Admin extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.createPost = this.createPost.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)

    this.state = { body: '', title: '', caption: '' }
  }

  public createPost (e: any) {
    e.preventDefault()
    createPost(this.state.title, this.state.caption, this.state.body)
  }

  public handleInputChange(event: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    });
  }

  public handleBodyChange(body: string) {
    this.setState({body})
  }

  render() {
    return (
      <div className="container">
        <h1 className="title is-2">Create a Post</h1>
        <form>
          <div className="field">
            <label className="label">Title</label>
            <p className="control">
              <input className="input" name="title" type="text" placeholder="Title" onChange={this.handleInputChange} />
            </p>
          </div>
          <div className="field">
            <label className="label">Caption</label>
            <p className="control">
              <input className="input" name="caption" type="text" placeholder="Caption" onChange={this.handleInputChange} />
            </p>
          </div>
          <ReactQuill theme="snow" modules={modules} name="body" value={this.state.body} onChange={this.handleBodyChange} />
          <input className="button is-primary" type="submit" value="Submit" onClick={this.createPost} onSubmit={this.createPost}/>
        </form>
      </div>
    )
  }
}
