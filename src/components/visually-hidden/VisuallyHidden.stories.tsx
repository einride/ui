import { Story } from "@storybook/react/types-6-0"
import { Paragraph } from "../typography/Paragraph/Paragraph"
import { VisuallyHidden, VisuallyHiddenProps } from "./VisuallyHidden"

export default {
  title: "VisuallyHidden/VisuallyHidden",
  component: VisuallyHidden,
}

const Template: Story<VisuallyHiddenProps> = (args) => (
  <>
    <Paragraph>This is visible</Paragraph>
    <VisuallyHidden {...args} />
  </>
)

export const Default = Template.bind({})
Default.args = {
  children: <Paragraph>This is hidden</Paragraph>,
}
