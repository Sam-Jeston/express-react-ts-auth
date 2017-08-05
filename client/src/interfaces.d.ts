interface PostDef {
  id: number
  title: string
  caption: string
  body: string
  created_at: string
  updated_at: string
}

interface HomeState {
  posts: PostDef[]
}

interface AxiosData {
  data: any
  status: number
}
