import "bootstrap/dist/css/bootstrap.css"
import React, { ChangeEvent, Fragment, useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import { AxiosInstance } from "../api/AxiosInstance"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import { Paginations } from "../components/Pagination"
import { enqueueSnackbar } from "notistack"
import ReactLoading from "react-loading"
import { TDataBlog, TParams, TRes } from "../common/types/Blog"

export const Home = () => {
  const [dataBlog, setDataBlog] = useState<TDataBlog[]>()
  const [paramsData, setParamsData] = useState<TParams>({
    limit: 10,
    sortBy: "id",
    order: "asc",
    search: "",
  })
  const history = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const FetchBlog = async () => {
      try {
        const { data } = await AxiosInstance.get<TRes[]>("/blogs", {
          params: { ...paramsData, page: currentPage },
        })
        setDataBlog(
          data.map((items: TRes) => ({
            title: items?.title,
            content: items?.content,
            image: items?.image,
            id: items.id,
          }))
        )
        setIsLoading(false)
      } catch (error: any) {
        enqueueSnackbar(error.message, {
          variant: "error",
        })
      }
    }
    FetchBlog()
  }, [currentPage, paramsData])

  const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setParamsData((pre: TParams) => {
      const newParams = {
        ...pre,
        order: e.target.value,
      }
      return newParams
    })
  }

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setParamsData((pre: TParams) => {
      const newParams = {
        ...pre,
        search: e.target.value,
      }
      return newParams
    })
    setCurrentPage(1)
  }

  return (
    <div className="w-100 p-5">
      <h4>Home</h4>
      <Form.Group className="d-flex justify-content-between">
        <Form.Select onChange={onChangeFilter} className="w-25">
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </Form.Select>
        <Form.Control onChange={onChangeSearch} className="w-50" placeholder="Search..." />
        <Button variant="primary" className="ml-3" onClick={() => history("/blog/add")}>
          + Add
        </Button>
      </Form.Group>
      {isLoading ? (
        <ReactLoading type={"bars"} color={"black"} height={100} width={100} />
      ) : (
        <Fragment>
          {dataBlog?.map((data, index: number) => (
            <Card
              className="d-flex flex-row border-0 my-5"
              key={index}
              onClick={() => history(`/blog/detail/${data.id}`)}
            >
              <Card.Img alt="img" src={data.image} className="w-25 h-25 cursor-pointer" />
              <Card.Body className="py-0">
                <h3>{data.title}</h3>
                <p>{data.content}</p>
              </Card.Body>
            </Card>
          ))}
        </Fragment>
      )}

      <Paginations
        itemsCount={100}
        itemsPerPage={10}
        currentPage={currentPage || 1}
        setCurrentPage={setCurrentPage}
        alwaysShown={false}
      />
      <br />
    </div>
  )
}
