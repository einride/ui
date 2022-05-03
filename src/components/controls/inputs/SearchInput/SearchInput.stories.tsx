import { Story } from "@storybook/react/types-6-0"
import { SearchInput, SearchInputProps } from "./SearchInput"

export default {
  title: "Controls/Inputs/SearchInput",
  component: SearchInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=13%3A26",
    },
  },
}

const Template: Story<SearchInputProps> = (args) => <SearchInput {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: "Search...",
}

export const Controlled = Template.bind({})
Controlled.args = {
  ...Default.args,
  value: "",
}
