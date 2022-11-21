import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { Segments } from "./Segments"

export default {
  title: "Controls/Segments/Segments",
  component: Segments,
} as ComponentMeta<typeof Segments>

const Template: ComponentStory<typeof Segments> = (args) => <Segments {...args} />

export const Basic = Template.bind({})
Basic.args = {
  segments: [
    {
      id: "segment-1",
      text: "First Segment",
      content: <Paragraph>First segment content.</Paragraph>,
    },
    {
      id: "segment-2",
      text: "Second Segment",
      content: <Paragraph>Second segment content.</Paragraph>,
    },
    {
      id: "segment-3",
      text: "Third segment",
      content: <Paragraph>Third segment content.</Paragraph>,
    },
  ],
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tablist = canvas.getByRole("tablist")
  await expect(tablist).toBeInTheDocument()
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  ...Basic.args,
  defaultValue: 2,
}
DefaultValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tab1 = canvas.getByRole("tab", { name: /first segment/i })
  const tab2 = canvas.getByRole("tab", { name: /second segment/i })
  const tab3 = canvas.getByRole("tab", { name: /third segment/i })
  const tab1Content = /first segment content/i
  const tab2Content = /second segment content/i
  const tab3Content = /third segment content/i
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).toHaveAttribute("aria-selected", "true")
  await expect(canvas.queryByText(tab1Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab2Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab3Content)).toBeInTheDocument()
}

const ControlledTemplate: ComponentStory<typeof Segments> = (args) => {
  const [value, setValue] = useState(1)
  return <Segments {...args} value={value} onValueChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Basic.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tablist = canvas.getByRole("tablist")
  await expect(tablist).toBeInTheDocument()
}

export const MouseNavigation = Template.bind({})
MouseNavigation.args = {
  ...Basic.args,
}
MouseNavigation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tab1 = canvas.getByRole("tab", { name: /first segment/i })
  const tab2 = canvas.getByRole("tab", { name: /second segment/i })
  const tab3 = canvas.getByRole("tab", { name: /third segment/i })
  const tab1Content = /first segment content/i
  const tab2Content = /second segment content/i
  const tab3Content = /third segment content/i
  await expect(tab1).toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  await expect(canvas.queryByText(tab1Content)).toBeInTheDocument()
  await expect(canvas.queryByText(tab2Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab3Content)).not.toBeInTheDocument()
  await userEvent.click(tab2)
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  await expect(canvas.queryByText(tab1Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab2Content)).toBeInTheDocument()
  await expect(canvas.queryByText(tab3Content)).not.toBeInTheDocument()
  await userEvent.click(tab3)
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).toHaveAttribute("aria-selected", "true")
  await expect(canvas.queryByText(tab1Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab2Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab3Content)).toBeInTheDocument()
}

export const ControlledMouseNavigation = ControlledTemplate.bind({})
ControlledMouseNavigation.args = {
  ...Basic.args,
}
ControlledMouseNavigation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tab1 = canvas.getByRole("tab", { name: /first segment/i })
  const tab2 = canvas.getByRole("tab", { name: /second segment/i })
  const tab3 = canvas.getByRole("tab", { name: /third segment/i })
  const tab1Content = /first segment content/i
  const tab2Content = /second segment content/i
  const tab3Content = /third segment content/i
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  await expect(canvas.queryByText(tab1Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab2Content)).toBeInTheDocument()
  await expect(canvas.queryByText(tab3Content)).not.toBeInTheDocument()
  await userEvent.click(tab1)
  await expect(tab1).toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  await expect(canvas.queryByText(tab1Content)).toBeInTheDocument()
  await expect(canvas.queryByText(tab2Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab3Content)).not.toBeInTheDocument()
  await userEvent.click(tab3)
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).toHaveAttribute("aria-selected", "true")
  await expect(canvas.queryByText(tab1Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab2Content)).not.toBeInTheDocument()
  await expect(canvas.queryByText(tab3Content)).toBeInTheDocument()
}
