type TDataBlog = {
  title: string
  content: string
  image: string
  titleBody?: string
  contentBody?: string
  imageBody?: string
  id?: string
}

type TRes = {
  createAt: string
  id: string
  title: string
  content: string
  image: string
  body: {
    title: string
    content: string
    image: string
  }
}

type TParams = {
  page?: number
  limit: number
  sortBy: string
  order: string
  search: string
}

type TBlogState = {
  blog: {
    data: TRes
    loading: boolean
  }
}

export type { TDataBlog, TRes, TParams, TBlogState }
