import React, { FC, useEffect, useState } from "react"
import { Blog } from "../components/Blog"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs } from "../redux/blogsSlice"
import { TBlogState, TDataBlog } from "../common/types/Blog"

export const EditBlog: FC = () => {
  const [dataBlogDetail, setDataBlogDetail] = useState<TDataBlog>({
    title: "",
    content: "",
    image: "",
    id: "",
    titleBody: "",
    contentBody: "",
    imageBody: "",
  })
  const { id } = useParams()

  const blog = useSelector((state: TBlogState) => state.blog.data)
  const dispatch = useDispatch<any>()
  const { title, content, image, body } = blog

  useEffect(() => {
    dispatch(fetchBlogs(id ?? ""))
    setDataBlogDetail({
      title: title,
      content: content,
      image: image,
      id: blog.id,
      titleBody: body?.title || "",
      contentBody: body?.content || "",
      imageBody: body?.image || "",
    })
  }, [blog.id, body?.content, body?.image, body?.title, content, dispatch, id, image, title])

  return <Blog data={dataBlogDetail} />
}
