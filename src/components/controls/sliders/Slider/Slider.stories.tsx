import { Story } from "@storybook/react/types-6-0"
import { useState } from "react"
import { Slider, SliderProps } from "./Slider"

export default {
  title: "Controls/Sliders/Slider",
  component: Slider,
}

const Template: Story<SliderProps> = (args) => <Slider {...args} />

export const Default = Template.bind({})
Default.args = {}

const ControlledTemplate: Story<SliderProps> = (args) => {
  const [value, setValue] = useState(10)

  const handleChange = (newValue: number): void => {
    setValue(newValue)
  }

  return <Slider {...args} value={value} onInputChange={handleChange} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {}

export const Disabled = ControlledTemplate.bind({})
Disabled.args = {
  disabled: true,
}
