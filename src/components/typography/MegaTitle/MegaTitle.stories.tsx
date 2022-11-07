import { ComponentMeta, ComponentStory } from "@storybook/react"
import { MegaTitle } from "./MegaTitle"

export default {
  title: "Typography/MegaTitle",
  component: MegaTitle,
} as ComponentMeta<typeof MegaTitle>

const Template: ComponentStory<typeof MegaTitle> = (args) => <MegaTitle {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "A whole new way to ship.",
}
