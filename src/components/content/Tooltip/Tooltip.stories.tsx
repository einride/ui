import styled from "@emotion/styled"
import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, waitFor, within } from "@storybook/testing-library"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Table as TableComponent } from "../../table/Table/Table"
import { Tbody } from "../../table/Tbody/Tbody"
import { Td } from "../../table/Td/Td"
import { Th } from "../../table/Th/Th"
import { Thead } from "../../table/Thead/Thead"
import { Tr } from "../../table/Tr/Tr"
import { Text } from "../../typography/Text/Text"
import { Tooltip } from "./Tooltip"

const meta = {
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: "Tooltip trigger",
    content: "Tooltip content",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tooltipTrigger = canvas.getByRole("button", { name: "Tooltip trigger" })
    await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
  },
} satisfies Story

export const ButtonTrigger = {
  args: {
    children: <PrimaryButton>Hover me</PrimaryButton>,
    content: "Here's some more context on what the button does",
    triggerAsChild: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tooltipTrigger = canvas.getByRole("button", { name: "Hover me" })
    await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
  },
} satisfies Story

const TableTemplate = (): JSX.Element => (
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
        <Td>Address</Td>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>January</Td>
        <Td>100 kg</Td>
        <Td>
          <Tooltip content="Regeringsgatan 65, 111 56 Stockholm">
            <TruncatedText>Regeringsgatan 65, 111 56 Stockholm</TruncatedText>
          </Tooltip>
        </Td>
      </Tr>
      <Tr>
        <Td>February</Td>
        <Td>500 kg</Td>
        <Td>
          <Tooltip content="Anders Carlssons gata 12, Gothenburg, 417 55">
            <TruncatedText>Anders Carlssons gata 12B, 417 55 Gothenburg</TruncatedText>
          </Tooltip>
        </Td>
      </Tr>
    </Tbody>
  </TableComponent>
)

const TruncatedText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-inline-size: ${({ theme }) => 30 * theme.spacingBase}rem;
`

export const Table = {
  render: (args) => <TableTemplate {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tooltipTrigger = canvas.getByRole("button", { name: "CO2e" })
    await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
  },
} satisfies StoryObj

export const OpenDelay = {
  args: {
    children: "Text with tooltip that opens with a delay",
    content: "Here's the tooltip!",
    openDelayDuration: 700,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tooltipTrigger = canvas.getByRole("button", {
      name: "Text with tooltip that opens with a delay",
    })
    await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
  },
} satisfies Story

export const Multiline = {
  args: {
    children: "Tooltip trigger",
    content:
      "Some really really really really really really really really really really really really really really really really really really really really really really really long tooltip content.",
    width: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tooltipTrigger = canvas.getByRole("button", { name: "Tooltip trigger" })
    await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
  },
} satisfies Story

export const Pointer = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tooltipTrigger = canvas.getByRole("button", { name: "Tooltip trigger" })
    await expect(tooltipTrigger).toHaveAttribute("data-state", "closed")
    await expect(tooltipTrigger).toHaveAccessibleDescription("")
    await userEvent.hover(tooltipTrigger)
    waitFor(() => {
      expect(tooltipTrigger).toHaveAttribute("data-state", "delayed-open")
      expect(tooltipTrigger).toHaveAccessibleDescription("Tooltip content")
    })
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
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
  },
} satisfies Story
