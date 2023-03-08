import React, { FC } from "react"
import { Blog } from "../components/Blog"

export const AddBlog: FC = () => {
  return (
    <Blog
      screenAdd
      data={{
        title: "",
        content: "",
        image: "",
        titleBody: undefined,
        contentBody: undefined,
        imageBody: undefined,
        id: undefined,
      }}
    />
  )
}
