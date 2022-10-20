import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { screen, userEvent } from "@storybook/testing-library"
import { TextInput } from "./TextInput"

export default {
  title: "Controls/Inputs/TextInput",
  component: TextInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Label",
  placeholder: "Placeholder...",
}

export const Label = Template.bind({})
Label.args = {
  label: "Label",
}

export const Positive = Template.bind({})
Positive.args = {
  ...Label.args,
  message: "Confirmation message.",
  status: "success",
}

export const Negative = Template.bind({})
Negative.args = {
  ...Label.args,
  message: "Error message.",
  status: "fail",
}

export const NegativeFeedback = Template.bind({})
NegativeFeedback.args = {
  label: "Label",
  message: "Error message.",
  status: "fail",
}
NegativeFeedback.play = async () => {
  const input = screen.getByLabelText("Label")
  expect(input).not.toHaveFocus()
  userEvent.tab()
  expect(input).toHaveFocus()
  userEvent.tab()
  expect(input).not.toHaveFocus()
  await userEvent.type(input, "example-email@email.com", {
    delay: 50,
  })
  const errorMessage = screen.getByRole("alert")
  expect(errorMessage).toBeInTheDocument()
  expect(input).toHaveErrorMessage("Error message.")
}
