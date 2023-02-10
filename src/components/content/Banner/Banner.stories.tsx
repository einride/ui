import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Banner } from "./Banner"

export default {
  title: "Content/Banner",
  component: Banner,
} satisfies ComponentMeta<typeof Banner>

type Story = ComponentStoryObj<typeof Banner>

export const Default = {
  args: {
    title: "Title",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText("Title")
    expect(title).toBeInTheDocument()
  },
} satisfies Story

export const Success = {
  args: {
    ...Default.args,
    status: "success",
  },
} satisfies Story

export const Warning = {
  args: {
    ...Default.args,
    status: "warning",
  },
} satisfies Story

export const Fail = {
  args: {
    ...Default.args,
    status: "fail",
  },
} satisfies Story
