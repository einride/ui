import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, waitFor, within } from "@storybook/testing-library"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Table as TableComponent } from "../../table/Table/Table"
import { Tbody } from "../../table/Tbody/Tbody"
import { Td } from "../../table/Td/Td"
import { Th } from "../../table/Th/Th"
import { Thead } from "../../table/Thead/Thead"
import { Tr } from "../../table/Tr/Tr"
import { Tooltip } from "./Tooltip"

export default {
  title: "Content/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Tooltip trigger",
  content: "Tooltip content",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tooltipTrigger = canvas.getByRole("button", { name: "Tooltip trigger" })
  await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
}

export const ButtonTrigger = Template.bind({})
ButtonTrigger.args = {
  children: <PrimaryButton>Hover me</PrimaryButton>,
  content: "Here's some more context on what the button does",
  triggerAsChild: true,
}
ButtonTrigger.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tooltipTrigger = canvas.getByRole("button", { name: "Hover me" })
  await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
}

const TableTemplate: ComponentStory<typeof Tooltip> = () => (
  <TableComponent>
    <Thead>
      <Tr color="secondary">
        <Th scope="col">Month</Th>
        <Th scope="col">
          <Tooltip
            content={
              <>
                Carbon dioxide equivalent (CO<sub>2</sub>e)
              </>
            }
            hint
          >
            CO<sub>2</sub>e
          </Tooltip>{" "}
          savings
        </Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>January</Td>
        <Td>100 kg</Td>
      </Tr>
      <Tr>
        <Td>February</Td>
        <Td>500 kg</Td>
      </Tr>
    </Tbody>
  </TableComponent>
)

export const Table = TableTemplate.bind({})
Table.args = {}
Table.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tooltipTrigger = canvas.getByRole("button", { name: "CO2e" })
  await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...Basic.args,
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tooltipTrigger = canvas.getByRole("button", { name: "Tooltip trigger" })
  await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
  await expect(tooltipTrigger).toHaveAccessibleDescription("")
  await userEvent.hover(tooltipTrigger)
  waitFor(() => {
    expect(tooltipTrigger).toHaveAttribute("data-state", "delayed-open")
    expect(tooltipTrigger).toHaveAccessibleDescription("Tooltip content")
  })
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...Basic.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const tooltipTrigger = canvas.getByRole("button", { name: "Tooltip trigger" })
  await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
  await expect(tooltipTrigger).toHaveAccessibleDescription("")
  await userEvent.tab()
  waitFor(() => {
    expect(tooltipTrigger).toHaveAttribute("data-state", "instant-open")
    expect(tooltipTrigger).toHaveAccessibleDescription("Tooltip content")
  })
  await userEvent.tab()
  await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
  await expect(tooltipTrigger).toHaveAccessibleDescription("")
}
