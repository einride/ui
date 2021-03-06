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
}

const Template: Story<SearchInputProps> = (args) => <SearchInput {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: "Search...",
}
