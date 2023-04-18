import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { Tabs } from "./Tabs"
import { TabsContent } from "./TabsContent"
import { TabsList } from "./TabsList"
import { TabsTrigger } from "./TabsTrigger"

const meta = {
  component: Tabs,
  args: {
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1">First tab</TabsTrigger>
          <TabsTrigger value="tab2">Second tab</TabsTrigger>
          <TabsTrigger value="tab3">Third tab</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">First tab content</TabsContent>
        <TabsContent value="tab2">Second tab content</TabsContent>
        <TabsContent value="tab3">Third tab content</TabsContent>
      </>
    ),
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    defaultValue: "tab1",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: /first tab/i })
    const tab2 = canvas.getByRole("tab", { name: /second tab/i })
    const tab3 = canvas.getByRole("tab", { name: /third tab/i })
    await expect(tab1).toHaveAttribute("aria-selected", "true")
    await expect(tab2).not.toHaveAttribute("aria-selected", "true")
    await expect(tab3).not.toHaveAttribute("aria-selected", "true")
    const tabpanel = canvas.getByRole("tabpanel", { name: /first tab/i })
    await expect(tabpanel).toHaveTextContent(/first tab content/i)
  },
} satisfies Story

export const Disabled = {
  args: {
    children: (
      <>
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
      </>
    ),
    defaultValue: "tab1",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: /first tab/i })
    const tab2 = canvas.getByRole("tab", { name: /second tab/i })
    const tab3 = canvas.getByRole("tab", { name: /third tab/i })
    await expect(tab1).not.toBeDisabled()
    await expect(tab2).not.toBeDisabled()
    await expect(tab3).toBeDisabled()
  },
} satisfies Story

export const Grow = {
  args: {
    defaultValue: "tab1",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: /first tab/i })
    const tab2 = canvas.getByRole("tab", { name: /second tab/i })
    const tab3 = canvas.getByRole("tab", { name: /third tab/i })
    await expect(tab1).toHaveAttribute("aria-selected", "true")
    await expect(tab2).not.toHaveAttribute("aria-selected", "true")
    await expect(tab3).not.toHaveAttribute("aria-selected", "true")
    const tabpanel = canvas.getByRole("tabpanel", { name: /first tab/i })
    await expect(tabpanel).toHaveTextContent(/first tab content/i)
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof Tabs>): JSX.Element => {
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

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1">First tab</TabsTrigger>
          <TabsTrigger value="tab2">Second tab</TabsTrigger>
          <TabsTrigger value="tab3">Third tab</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">First tab content</TabsContent>
        <TabsContent value="tab2">Second tab content</TabsContent>
        <TabsContent value="tab3">Third tab content</TabsContent>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: /first tab/i })
    const tab2 = canvas.getByRole("tab", { name: /second tab/i })
    const tab3 = canvas.getByRole("tab", { name: /third tab/i })
    await expect(tab1).toHaveAttribute("aria-selected", "true")
    await expect(tab2).not.toHaveAttribute("aria-selected", "true")
    await expect(tab3).not.toHaveAttribute("aria-selected", "true")
    const tabpanel = canvas.getByRole("tabpanel", { name: /first tab/i })
    await expect(tabpanel).toHaveTextContent(/first tab content/i)
  },
} satisfies Story

export const Pointer = {
  args: {
    defaultValue: "tab1",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: /first tab/i })
    const tab2 = canvas.getByRole("tab", { name: /second tab/i })
    const tab3 = canvas.getByRole("tab", { name: /third tab/i })

    await step("Expect first tab panel to show initially", async () => {
      await expect(tab1).toHaveAttribute("aria-selected", "true")
      await expect(tab2).not.toHaveAttribute("aria-selected", "true")
      await expect(tab3).not.toHaveAttribute("aria-selected", "true")
      const tab1panel = canvas.getByRole("tabpanel", { name: /first tab/i })
      await expect(tab1panel).toHaveTextContent(/first tab content/i)
    })

    await step("Expect second tab panel to show when clicking second tab", async () => {
      await userEvent.click(tab2)
      await expect(tab1).not.toHaveAttribute("aria-selected", "true")
      await expect(tab2).toHaveAttribute("aria-selected", "true")
      await expect(tab3).not.toHaveAttribute("aria-selected", "true")
      const tab2panel = canvas.getByRole("tabpanel", { name: /second tab/i })
      await expect(tab2panel).toHaveTextContent(/second tab content/i)
    })

    await step("Expect third tab panel to show when clicking third tab", async () => {
      await userEvent.click(tab3)
      await expect(tab1).not.toHaveAttribute("aria-selected", "true")
      await expect(tab2).not.toHaveAttribute("aria-selected", "true")
      await expect(tab3).toHaveAttribute("aria-selected", "true")
      const tab3panel = canvas.getByRole("tabpanel", { name: /third tab/i })
      await expect(tab3panel).toHaveTextContent(/third tab content/i)
    })
  },
} satisfies Story

export const Keyboard = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    defaultValue: "tab1",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: /first tab/i })
    const tab2 = canvas.getByRole("tab", { name: /second tab/i })
    const tab3 = canvas.getByRole("tab", { name: /third tab/i })

    await step("Expect first tab panel to show initially", async () => {
      await expect(tab1).toHaveAttribute("aria-selected", "true")
      await expect(tab2).not.toHaveAttribute("aria-selected", "true")
      await expect(tab3).not.toHaveAttribute("aria-selected", "true")
      const tab1panel = canvas.getByRole("tabpanel", { name: /first tab/i })
      await expect(tab1panel).toHaveTextContent(/first tab content/i)
    })

    await step("Expect first tab to get focus when tabbing", async () => {
      await expect(tab1).not.toHaveFocus()
      await userEvent.click(tab1)
      await expect(tab1).toHaveFocus()
    })

    await step("Expect second tab panel to show when clicking ArrowRight", async () => {
      await expect(tab2).not.toHaveFocus()
      await userEvent.keyboard("[ArrowRight]")
      await expect(tab2).toHaveFocus()
      await expect(tab1).not.toHaveAttribute("aria-selected", "true")
      await expect(tab2).toHaveAttribute("aria-selected", "true")
      await expect(tab3).not.toHaveAttribute("aria-selected", "true")
      const tab2panel = canvas.getByRole("tabpanel", { name: /second tab/i })
      await expect(tab2panel).toHaveTextContent(/second tab content/i)
    })

    await step("Expect third tab panel to show when clicking ArrowRight", async () => {
      await expect(tab3).not.toHaveFocus()
      await userEvent.keyboard("[ArrowRight]")
      await expect(tab3).toHaveFocus()
      await expect(tab1).not.toHaveAttribute("aria-selected", "true")
      await expect(tab2).not.toHaveAttribute("aria-selected", "true")
      await expect(tab3).toHaveAttribute("aria-selected", "true")
      const tab3panel = canvas.getByRole("tabpanel", { name: /third tab/i })
      await expect(tab3panel).toHaveTextContent(/third tab content/i)
    })

    await step(
      "Expect first tab panel to show when clicking ArrowRight from the last tab panel",
      async () => {
        await expect(tab1).not.toHaveFocus()
        await userEvent.keyboard("[ArrowRight]")
        await expect(tab1).toHaveFocus()
        await expect(tab1).toHaveAttribute("aria-selected", "true")
        await expect(tab2).not.toHaveAttribute("aria-selected", "true")
        await expect(tab3).not.toHaveAttribute("aria-selected", "true")
        const tab1panel = canvas.getByRole("tabpanel", { name: /first tab/i })
        await expect(tab1panel).toHaveTextContent(/first tab content/i)
      },
    )
  },
} satisfies Story
