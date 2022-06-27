import { Story } from "@storybook/react/types-6-0"
import { useState } from "react"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { SearchSelect, SearchSelectProps } from "./SearchSelect"

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
    label: <Paragraph>Option 1</Paragraph>,
    value: "option 1",
    description: "description one",
  },
  {
    label: <Paragraph>Option 2</Paragraph>,
    value: "option 2",
    description: "description two",
  },
  {
    label: <Paragraph>Option 3</Paragraph>,
    value: "option 3",
    description: "description three",
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: Story<SearchSelectProps> = ({ options, ...args }) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <SearchSelect
      {...args}
      filter={(value, option) =>
        option.value.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (option as any).description.toLowerCase().trim().includes(value.toLowerCase().trim())
      }
      isSearchable
      onSearchChange={(text) => setSearchTerm(text)}
      options={OPTIONS}
      value={searchTerm}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
