import { Blog } from "./Blog"
import type { ComponentStoryObj, Meta } from "@storybook/react"
import type { ComponentProps } from "react"

const meta: Meta<ComponentProps<typeof Blog>> = {
  args: {
    data: {
      title: "Test",
      content: "Test",
      image: "Test",
      titleBody: "Test",
      contentBody: "Test",
      imageBody: "Test",
      id: "1",
    },
  },
  component: Blog,
}
export default meta

export const Introduction: ComponentStoryObj<typeof Blog> = {}
