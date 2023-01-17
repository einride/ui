import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { MultiSelect } from "./MultiSelect"

export default {
  title: "Controls/Selects/MultiSelect",
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>
const basicOptions = [
  {
    key: "option-1",
    label: <Paragraph>Snowfall guzzler drapery</Paragraph>,
    value: "Snowfall guzzler drapery",
    description: "description one",
  },
  {
    key: "option-2",
    label: <Paragraph>Remorse strike tartly</Paragraph>,
    value: "Remorse strike tartly",
    description: "description two",
  },
  {
    key: "option-3",
    label: <Paragraph>Operator dazzling breeding</Paragraph>,
    value: "Operator dazzling breeding",
    description: "description three",
  },
  {
    key: "option-4",
    label: <Paragraph>Egestas Lorem Ullamcorper</Paragraph>,
    value: "Egestas Lorem Ullamcorper",
    description: "description one",
  },
  {
    key: "option-5",
    label: <Paragraph>Ornare Egestas Ridiculus</Paragraph>,
    value: "Ornare Egestas Ridiculus",
    description: "description two",
  },
  {
    key: "option-6",
    label: <Paragraph>Ridiculus Elit Inceptos</Paragraph>,
    value: "Ridiculus Elit Inceptos",
    description: "description three",
  },
]

const Template: ComponentStory<typeof MultiSelect<(typeof basicOptions)[0]>> = (args) => {
  const [searchTerm, setSearchTerm] = useState("")
  return <MultiSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Label",
  options: basicOptions,
}
