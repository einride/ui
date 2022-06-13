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
  },
  {
    label: <Paragraph>Option 2</Paragraph>,
    value: "option 2",
  },
  {
    label: <Paragraph>Option 3</Paragraph>,
    value: "option 3",
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: Story<SearchSelectProps> = ({ options, ...args }) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <SearchSelect
      value={searchTerm}
      onSearchChange={(text) => setSearchTerm(text)}
      options={OPTIONS}
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
