import React from "react"
import { composeStories } from "@storybook/testing-react"
import { render } from "@testing-library/react"
import * as stories from "./Blog.stories"

const { Introduction } = composeStories(stories)
describe("components/Pagination", () => {
  it("Pagination is displayed", () => {
    const { getByText } = render(<Introduction />)
    expect(getByText("")).toBeInTheDocument()
  })
})