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
  {
    label: <Paragraph>Option 4</Paragraph>,
    value: "option 4",
  },
  {
    label: <Paragraph>Option 5</Paragraph>,
    value: "option 5",
  },
  {
    label: <Paragraph>Option 6</Paragraph>,
    value: "option 6",
  },
  {
    label: <Paragraph>Option 7</Paragraph>,
    value: "option 7",
  },
  {
    label: <Paragraph>Option 8</Paragraph>,
    value: "option 8",
  },
  {
    label: <Paragraph>Option 9</Paragraph>,
    value: "option 9",
  },
  {
    label: <Paragraph>Option 10</Paragraph>,
    value: "option 10",
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
