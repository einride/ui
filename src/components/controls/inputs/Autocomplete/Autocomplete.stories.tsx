import { Story } from "@storybook/react/types-6-0"
import { Autocomplete, AutocompleteProps } from "./Autocomplete"

export default {
  title: "Controls/Autocompletes/Autocomplete",
  component: Autocomplete,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<AutocompleteProps> = (args) => <Autocomplete {...args} />

export const Default = Template.bind({})
Default.args = {
  options: ["First option", "Second option", "Third option"],
  placeholder: "Placeholder...",
}

export const Positive = Template.bind({})
Positive.args = {
  ...Default.args,
  message: "Confirmation message.",
  status: "success",
}

export const Negative = Template.bind({})
Negative.args = {
  ...Default.args,
  message: "Error message.",
  status: "fail",
}

export const Controlled = Template.bind({})
Controlled.args = {
  ...Default.args,
  value: "",
}
