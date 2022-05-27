import { Story } from "@storybook/react/types-6-0"
import { Slider, SliderProps } from "./Slider"

export default {
  title: "Controls/Sliders/Slider",
  component: Slider,
}

const Template: Story<SliderProps> = (args) => <Slider {...args} />

export const Default = Template.bind({})
Default.args = {}
