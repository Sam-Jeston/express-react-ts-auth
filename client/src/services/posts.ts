const axios = require('axios')

export function getPosts() {
  return axios.get('/posts').then((d: AxiosData) => d.data)
}

export function getPost(id: number) {
  return axios.get(`/post/${id}`).then((d: AxiosData) => d.data)
}

export function createPost(title: string, caption: string, body: string) {
  return axios.post(`/post`, {
    title,
    caption,
    body
  })
}
