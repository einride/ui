import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { SearchInput } from "./SearchInput"

export default {
  title: "Controls/Inputs/SearchInput",
  component: SearchInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof SearchInput>

const Template: ComponentStory<typeof SearchInput> = (args) => <SearchInput {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Search for something fun",
  placeholder: "Search...",
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox")
  await expect(input).toHaveAccessibleName("Search for something fun")
}

export const ClearButton = Template.bind({})
ClearButton.args = {
  ...Default.args,
}
ClearButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox")
  await expect(input).toHaveAccessibleName("Search for something fun")
  await userEvent.type(input, "I'm searching for something fun!", { delay: 10 })
  await expect(input).toHaveValue("I'm searching for something fun!")
  const clearButton = canvas.getByRole("button")
  await expect(clearButton).toBeInTheDocument()
  await expect(clearButton).toHaveAccessibleName("Clear input")
  await userEvent.click(clearButton)
  await expect(input).toHaveValue("")
  await expect(clearButton).not.toBeInTheDocument()
}
