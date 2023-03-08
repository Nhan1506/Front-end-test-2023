import React, { Dispatch, FC, useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs } from "../redux/blogsSlice"
import ReactLoading from "react-loading"
import { TBlogState, TDataBlog } from "../common/types/Blog"

export const Detail: FC = () => {
  const { id } = useParams()
  const history = useNavigate()
  const [dataBlogDetail, setDataBlogDetail] = useState<TDataBlog>({
    title: "",
    content: "",
    image: "",
    id: "",
    titleBody: "",
    contentBody: "",
    imageBody: "",
  })

  const blog = useSelector((state: TBlogState) => state.blog.data)
  const isLoading = useSelector((state: TBlogState) => state.blog.loading)
  const dispatch: Dispatch<any> = useDispatch()
  const { title, content, image, body } = blog

  useEffect(() => {
    dispatch(fetchBlogs(id || ""))
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

  return (
    <>
      <h1 className="m-2">Detail Blog</h1>
      <Form.Group className="text-end mx-5">
        <Button variant="primary" className="ml-3" onClick={() => history(`/blog/edit/${id}`)}>
          Edit
        </Button>
      </Form.Group>
      {isLoading ? (
        <ReactLoading type="bars" color="black" height={100} width={100} />
      ) : (
        <Card className="d-flex border-0 my-5 mx-5">
          <Card.Img alt="img" src={dataBlogDetail.image} className="w-100 h-100 cursor-pointer" />
          <Card.Body>
            <h2>{dataBlogDetail.title}</h2>
            <p>{dataBlogDetail.content}</p>
            <Card className="d-flex border-0 my-5 mx-5">
              <Card.Img alt="img" src={dataBlogDetail.imageBody} className="w-25 h-25" />
              <h3>{dataBlogDetail.titleBody}</h3>
              <p>{dataBlogDetail.contentBody}</p>
            </Card>
          </Card.Body>
        </Card>
      )}
    </>
  )
}
