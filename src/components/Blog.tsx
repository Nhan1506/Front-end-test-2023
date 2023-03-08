import React, { FC, Fragment, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import "bootstrap/dist/css/bootstrap.css"
import { Container } from "react-bootstrap"
import { AxiosInstance } from "../api/AxiosInstance"
import { useNavigate, useParams } from "react-router-dom"
import { enqueueSnackbar } from "notistack"
import ReactLoading from "react-loading"
import { useForm } from "../common/hooks/useForm"
import { createFormBinder } from "../common/createFormBinder"
import { TDataBlog } from "../common/types/Blog"

type TBlogProps = {
  screenAdd?: boolean
  data: TDataBlog
}

export const Blog: FC<TBlogProps> = (props) => {
  const { screenAdd = false, data } = props
  const [isLoading, setIsLoading] = useState(false)
  const history = useNavigate()
  const { id } = useParams()
  const formData = useForm<TDataBlog>(data)
  const binder = createFormBinder(formData)

  const handleSubmitCreate = async (form: TDataBlog): Promise<void> => {
    setIsLoading(true)
    try {
      const res = await AxiosInstance.post("/blogs", {
        title: form.title,
        content: form.content,
        image: form.image,
      })
      if (res.status === 200) {
        enqueueSnackbar("Create Successfully !", {
          variant: "success",
        })
        setTimeout(() => {
          history("/")
          setIsLoading(false)
        }, 1000)
      }
    } catch (error: any) {
      enqueueSnackbar(error.response.data, {
        variant: "error",
      })
      setIsLoading(false)
    }
  }

  const handleSubmitEdit = async (form: TDataBlog): Promise<void> => {
    setIsLoading(true)
    try {
      const res = await AxiosInstance.put(`/blogs/${id}`, {
        title: form.title,
        content: form.content,
        image: form.image,
        body: {
          title: form.titleBody,
          content: form.contentBody,
          image: form.imageBody,
        },
      })
      if (res.status === 200) {
        enqueueSnackbar("Edit Successfully !", {
          variant: "success",
        })
        setTimeout(() => {
          history("/")
          setIsLoading(false)
        }, 1000)
      }
    } catch (error: any) {
      enqueueSnackbar(error.response.data, {
        variant: "error",
      })
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <ReactLoading type="bars" color="black" height={100} width={100} />
      ) : (
        <Fragment>
          <h1 className="m-2">{screenAdd ? "Create Blog" : "Edit Blog"} </h1>
          <Container>
            <Form {...binder.onSubmit(screenAdd ? handleSubmitCreate : handleSubmitEdit)}>
              <Form.Group className="mb-3">
                <Form.Label>Title: </Form.Label>
                <Form.Control type="text" placeholder="Enter title..." {...binder.textField("title")} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content: </Form.Label>
                <Form.Control type="text" placeholder="Enter content..." {...binder.textField("content")} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image: </Form.Label>
                <Form.Control type="text" placeholder="Enter image..." {...binder.textField("image")} required />
              </Form.Group>
              <h2>Body</h2>
              <Form.Group className="mb-3">
                <Form.Label>Title: </Form.Label>
                <Form.Control type="text" placeholder="Enter title..." {...binder.textField("titleBody")} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content: </Form.Label>
                <Form.Control type="text" placeholder="Enter content..." {...binder.textField("contentBody")} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image: </Form.Label>
                <Form.Control type="text" placeholder="Enter image..." {...binder.textField("imageBody")} />
              </Form.Group>
              <Button variant="primary" type="submit">
                {screenAdd ? "Create" : "Edit"}
              </Button>
            </Form>
          </Container>
        </Fragment>
      )}
    </>
  )
}
