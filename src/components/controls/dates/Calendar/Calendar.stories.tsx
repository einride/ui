import { parseDate } from "@internationalized/date"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { Calendar } from "./Calendar"

export default {
  title: "Controls/Dates/Calendar",
  component: Calendar,
} as ComponentMeta<typeof Calendar>

const ControlledTemplate: ComponentStory<typeof Calendar> = (args) => {
  const [value, setValue] = useState(parseDate("2022-08-10"))

  return <Calendar {...args} value={value} onChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  "aria-label": "Shipping date",
}
