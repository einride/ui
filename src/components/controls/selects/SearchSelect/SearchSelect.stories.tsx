import { Story } from "@storybook/react/types-6-0"
import { useState } from "react"
import { SearchSelect, SearchSelectProps } from "./SearchSelect"
import { SearchSelectOption } from "./SearchSelectOption"

export default {
  title: "Controls/Selects/SearchSelect",
  component: SearchSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const OPTIONS = [
  {
    children: "Option 1",
    value: "option 1",
  },
  {
    children: "Option 2",
    value: "option 2",
  },
  {
    children: "Option 3",
    value: "option 3",
  },
]

const Template: Story<SearchSelectProps> = (args) => {
  const [searchTerm, setSearchTerm] = useState("")
  const filteredOptions = OPTIONS.filter((option) =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <SearchSelect value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} {...args}>
      {filteredOptions.map((option) => (
        <SearchSelectOption key={option.value}>{option.children}</SearchSelectOption>
      ))}
    </SearchSelect>
  )
}

export const Default = Template.bind({})
Default.args = {}
