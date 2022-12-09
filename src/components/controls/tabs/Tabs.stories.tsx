import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Tabs } from "./Tabs"
import { TabsContent } from "./TabsContent"
import { TabsList } from "./TabsList"
import { TabsTrigger } from "./TabsTrigger"

export default {
  title: "Controls/Tabs/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabsList>
      <TabsTrigger value="tab1">First tab</TabsTrigger>
      <TabsTrigger value="tab2">Second tab</TabsTrigger>
      <TabsTrigger value="tab3">Third tab</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">First tab content</TabsContent>
    <TabsContent value="tab2">Second tab content</TabsContent>
    <TabsContent value="tab3">Third tab content</TabsContent>
  </Tabs>
)

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  defaultValue: "tab1",
}
DefaultValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tab1 = canvas.getByRole("tab", { name: /first tab/i })
  const tab2 = canvas.getByRole("tab", { name: /second tab/i })
  const tab3 = canvas.getByRole("tab", { name: /third tab/i })
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  const tabpanel = canvas.getByRole("tabpanel", { name: /second tab/i })
  await expect(tabpanel).toHaveTextContent(/second tab content/i)
}

const DisabledTemplate: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabsList>
      <TabsTrigger value="tab1">First tab</TabsTrigger>
      <TabsTrigger value="tab2">Second tab</TabsTrigger>
      <TabsTrigger value="tab3" disabled>
        Third tab
      </TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">First tab content</TabsContent>
    <TabsContent value="tab2">Second tab content</TabsContent>
    <TabsContent value="tab3">Third tab content</TabsContent>
  </Tabs>
)

export const Disabled = DisabledTemplate.bind({})
Disabled.args = {
  defaultValue: "tab1",
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tab1 = canvas.getByRole("tab", { name: /first tab/i })
  const tab2 = canvas.getByRole("tab", { name: /second tab/i })
  const tab3 = canvas.getByRole("tab", { name: /third tab/i })
  await expect(tab1).not.toBeDisabled()
  await expect(tab2).not.toBeDisabled()
  await expect(tab3).toBeDisabled()
}

const ControlledTemplate: ComponentStory<typeof Tabs> = (args) => {
  const [value, setValue] = useState("tab1")
  return (
    <Tabs {...args} value={value} onValueChange={setValue}>
      <TabsList>
        <TabsTrigger value="tab1">First tab</TabsTrigger>
        <TabsTrigger value="tab2">Second tab</TabsTrigger>
        <TabsTrigger value="tab3">Third tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">First tab content</TabsContent>
      <TabsContent value="tab2">Second tab content</TabsContent>
      <TabsContent value="tab3">Third tab content</TabsContent>
    </Tabs>
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tab1 = canvas.getByRole("tab", { name: /first tab/i })
  const tab2 = canvas.getByRole("tab", { name: /second tab/i })
  const tab3 = canvas.getByRole("tab", { name: /third tab/i })
  await expect(tab1).toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  const tabpanel = canvas.getByRole("tabpanel", { name: /first tab/i })
  await expect(tabpanel).toHaveTextContent(/first tab content/i)
}

export const Mouse = Template.bind({})
Mouse.args = {
  defaultValue: "tab1",
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tab1 = canvas.getByRole("tab", { name: /first tab/i })
  const tab2 = canvas.getByRole("tab", { name: /second tab/i })
  const tab3 = canvas.getByRole("tab", { name: /third tab/i })
  await expect(tab1).toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  const tab1panel = canvas.getByRole("tabpanel", { name: /first tab/i })
  await expect(tab1panel).toHaveTextContent(/first tab content/i)
  await userEvent.click(tab2)
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).toHaveAttribute("aria-selected", "true")
  const tab2panel = canvas.getByRole("tabpanel", { name: /second tab/i })
  await expect(tab2panel).toHaveTextContent(/second tab content/i)
  await userEvent.click(tab3)
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).toHaveAttribute("aria-selected", "true")
  const tab3panel = canvas.getByRole("tabpanel", { name: /third tab/i })
  await expect(tab3panel).toHaveTextContent(/third tab content/i)
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {
  defaultValue: "tab1",
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tab1 = canvas.getByRole("tab", { name: /first tab/i })
  const tab2 = canvas.getByRole("tab", { name: /second tab/i })
  const tab3 = canvas.getByRole("tab", { name: /third tab/i })
  await expect(tab1).toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  await expect(tab1).not.toHaveFocus()
  await userEvent.click(tab1)
  await expect(tab1).toHaveFocus()
  const tab1panel = canvas.getByRole("tabpanel", { name: /first tab/i })
  await expect(tab1panel).toHaveTextContent(/first tab content/i)
  await userEvent.keyboard("[ArrowRight]")
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).toHaveAttribute("aria-selected", "true")
  const tab2panel = canvas.getByRole("tabpanel", { name: /second tab/i })
  await expect(tab2panel).toHaveTextContent(/second tab content/i)
  await userEvent.keyboard("[ArrowRight]")
  await expect(tab1).not.toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).toHaveAttribute("aria-selected", "true")
  const tab3panel = canvas.getByRole("tabpanel", { name: /third tab/i })
  await expect(tab3panel).toHaveTextContent(/third tab content/i)
  await userEvent.keyboard("[ArrowRight]")
  await expect(tab1).toHaveAttribute("aria-selected", "true")
  await expect(tab2).not.toHaveAttribute("aria-selected", "true")
  await expect(tab3).not.toHaveAttribute("aria-selected", "true")
  await expect(tab1panel).toHaveTextContent(/first tab content/i)
}
