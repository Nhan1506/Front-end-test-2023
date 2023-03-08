import { Paginations } from "./Pagination"
import type { ComponentStoryObj, Meta } from "@storybook/react"
import type { ComponentProps } from "react"

const meta: Meta<ComponentProps<typeof Paginations>> = {
  args: {
    itemsCount: 20,
    itemsPerPage: 10,
    currentPage: 1,
    setCurrentPage: () => {},
    alwaysShown: true,
  },
  component: Paginations,
}
export default meta

export const Introduction: ComponentStoryObj<typeof Paginations> = {}
