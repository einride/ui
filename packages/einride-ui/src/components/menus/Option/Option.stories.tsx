import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Icon } from "../../content/Icon/Icon"
import { Text } from "../../typography/Text/Text"
import { Option } from "./Option"

const meta = {
  component: Option,
  argTypes: {
    as: {
      control: "text",
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Option>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: "Label",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Expect children to show", async () => {
      expect(canvas.getByText(Basic.args.children)).toBeInTheDocument()
    })
  },
} satisfies Story

/** Change the variant with the `variant` prop. */
export const Secondary = {
  args: {
    ...Basic.args,
    variant: "secondary",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Expect children to show", async () => {
      expect(canvas.getByText(Secondary.args.children)).toBeInTheDocument()
    })
  },
} satisfies Story

export const WithEndIcon = {
  args: {
    children: (
      <>
        <Text as="span">Label</Text>
        <Icon name="arrowRight" />
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Expect children to show", async () => {
      expect(canvas.getByText("Label")).toBeInTheDocument()
    })
  },
} satisfies Story

/** Use `children` to render content on the other side of the option. */
export const WithEndText = {
  args: {
    children: (
      <>
        <Text as="span">Label</Text>
        <Text as="span" color="secondary">
          Label
        </Text>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Expect children to show", async () => {
      expect(canvas.getAllByText("Label").length).toBe(2)
    })
  },
} satisfies Story

export const SecondaryWithEndLabel = {
  args: {
    ...WithEndText.args,
    variant: "secondary",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Expect children to show", async () => {
      expect(canvas.getAllByText("Label").length).toBe(2)
    })
  },
} satisfies Story

/** Use the `as` prop to change the rendered HTML element. */
export const AsButton = {
  args: {
    ...Basic.args,
    as: "button",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Expect children to show", async () => {
      expect(canvas.getByRole("button", { name: AsButton.args.children })).toBeInTheDocument()
    })
  },
} satisfies Story
