import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { MultiSelect } from "./MultiSelect"

export default {
  title: "Controls/Selects/MultiSelect",
  component: MultiSelect,
  argTypes: { onSelectionChange: { action: "onSelectionChange" } },
} as ComponentMeta<typeof MultiSelect>
const basicOptions = [
  {
    key: "f5211623-ac1d-4609-bf19-98b91f676c91",
    label: <Paragraph>Snowfall guzzler drapery</Paragraph>,
    value: "Snowfall guzzler drapery",
    description: "description one",
  },
  {
    key: "ad63d2dc-0ceb-4c0b-aa5b-796f39b13c4d",
    label: <Paragraph>Remorse strike tartly</Paragraph>,
    value: "Remorse strike tartly",
    description: "description two",
  },
  {
    key: "0db43e8e-fd10-4a4e-91a4-4b4bd02f7da8",
    label: <Paragraph>Operator dazzling breeding</Paragraph>,
    value: "Operator dazzling breeding",
    description: "description three",
  },
]
const largeDataset = [
  ...basicOptions,
  {
    key: "ab337869-616b-4f62-97ee-ac130c0d08f9",
    label: <Paragraph>Egestas Lorem Ullamcorper</Paragraph>,
    value: "Egestas Lorem Ullamcorper",
    description: "description one",
  },
  {
    key: "92839d36-fc31-4e26-9aa1-2a34b2b8722f",
    label: <Paragraph>Ornare Egestas Ridiculus</Paragraph>,
    value: "Ornare Egestas Ridiculus",
    description: "description two",
  },
  {
    key: "75da75b2-11c5-48b9-b008-1b0659289ea2",
    label: <Paragraph>Ridiculus Elit Inceptos</Paragraph>,
    value: "Ridiculus Elit Inceptos",
    description: "description three",
  },
  {
    key: "b6efa85c-c929-4a2d-aeaa-b6135cd2a5cf",
    label: <Paragraph>Donec id elit non mi</Paragraph>,
    value: "Donec id elit non mi",
    description: "description one",
  },
  {
    key: "a7689553-1bc6-4f0c-97f6-811d9e3a384b",
    label: <Paragraph>porta gravida at eget metus</Paragraph>,
    value: "porta gravida at eget metus",
    description: "description two",
  },
  {
    key: "fc1143c8-4ef8-4892-8b16-67870779c056",
    label: <Paragraph>Maecenas sed diam eget</Paragraph>,
    value: "Maecenas sed diam eget",
    description: "description three",
  },
  {
    key: "a5210284-88e3-4dc1-9cc7-5f7ef9ef7e3c",
    label: <Paragraph>risus varius blandit</Paragraph>,
    value: "risus varius blandit",
    description: "description one",
  },
  {
    key: "25be200c-5e8d-488c-8bb4-cb82bdf2313d",
    label: <Paragraph>sit amet non magna</Paragraph>,
    value: "sit amet non magna",
    description: "description two",
  },
  {
    key: "384dac57-ec15-4e51-a6df-cc80bffdfbb2",
    label: <Paragraph>Curabitur blandit tempus porttitor</Paragraph>,
    value: "Curabitur blandit tempus porttitor",
    description: "description three",
  },
  {
    key: "8357bdd5-813c-4dc0-a27b-533b376dcbca",
    label: <Paragraph>Duis mollis, est non commodo luctus</Paragraph>,
    value: "Duis mollis, est non commodo luctus",
    description: "description one",
  },
  {
    key: "b99b1abe-4868-4397-8594-8c55dc1f1c07",
    label: <Paragraph>nisi erat porttitor</Paragraph>,
    value: "nisi erat porttitor",
    description: "description two",
  },
  {
    key: "964ec5c0-98a1-4c25-a2cf-11c3b2063b0f",
    label: <Paragraph>ligula eget lacinia</Paragraph>,
    value: "ligula eget lacinia",
    description: "description three",
  },
  {
    key: "3e9ea3cc-fd22-4b92-b720-586870ea9c68",
    label: <Paragraph>odio sem nec elit</Paragraph>,
    value: "odio sem nec elit",
    description: "description one",
  },
  {
    key: "049d4308-168c-447e-b916-6953570bfe11",
    label: <Paragraph>Nullam quis risus</Paragraph>,
    value: "Nullam quis risus",
    description: "description two",
  },
  {
    key: "29a3f832-e537-4aeb-babb-99fe4e6f96cd",
    label: <Paragraph>eget urna mollis</Paragraph>,
    value: "eget urna mollis",
    description: "description three",
  },
  {
    key: "bdb92836-2240-46ac-ab64-f71586e60c52",
    label: <Paragraph>ornare vel eu leo</Paragraph>,
    value: "ornare vel eu leo",
    description: "description one",
  },
  {
    key: "873f1617-38cd-4219-9eec-6201e4c6f2e2",
    label: <Paragraph>Remorse strike tartly</Paragraph>,
    value: "Remorse strike tartly",
    description: "description two",
  },
  {
    key: "ce26e905-2702-4a9d-8408-a6bba2f5193b",
    label: <Paragraph>Operator dazzling breeding</Paragraph>,
    value: "Operator dazzling breeding",
    description: "description three",
  },
  {
    key: "9aa1ddd0-9b23-4d04-b699-6d9ae4e2ec7d",
    label: <Paragraph>Egestas Lorem Ullamcorper</Paragraph>,
    value: "Egestas Lorem Ullamcorper",
    description: "description one",
  },
  {
    key: "7935c311-459c-4329-9bbe-df35444ee327",
    label: <Paragraph>Ornare Egestas Ridiculus</Paragraph>,
    value: "Ornare Egestas Ridiculus",
    description: "description two",
  },
  {
    key: "630ed729-d830-4e1f-b051-ec93ef631469",
    label: <Paragraph>Ridiculus Elit Inceptos</Paragraph>,
    value: "Ridiculus Elit Inceptos",
    description: "description three",
  },
  {
    key: "1f7d6345-daa3-4760-b543-858ed3a2b16b",
    label: <Paragraph>Snowfall guzzler drapery</Paragraph>,
    value: "Snowfall guzzler drapery",
    description: "description one",
  },
  {
    key: "34834e88-1828-4561-ba74-3276abf945cb",
    label: <Paragraph>Remorse strike tartly</Paragraph>,
    value: "Remorse strike tartly",
    description: "description two",
  },
  {
    key: "a7845150-6ccf-4ca9-a747-aa2f037cfd40",
    label: <Paragraph>Operator dazzling breeding</Paragraph>,
    value: "Operator dazzling breeding",
    description: "description three",
  },
  {
    key: "50371f66-a8e7-40b7-ac13-fef482eb28eb",
    label: <Paragraph>Egestas Lorem Ullamcorper</Paragraph>,
    value: "Egestas Lorem Ullamcorper",
    description: "description one",
  },
  {
    key: "325854ed-5f1d-42ef-ba85-83e1335994cf",
    label: <Paragraph>Ornare Egestas Ridiculus</Paragraph>,
    value: "Ornare Egestas Ridiculus",
    description: "description two",
  },
  {
    key: "bbff3a5b-37e3-4468-85b6-736ba96aee7c",
    label: <Paragraph>Ridiculus Elit Inceptos</Paragraph>,
    value: "Ridiculus Elit Inceptos",
    description: "description three",
  },
  {
    key: "cbf8f88c-17ee-4c00-8fca-65be7253ff22",
    label: <Paragraph>Snowfall guzzler drapery</Paragraph>,
    value: "Snowfall guzzler drapery",
    description: "description one",
  },
  {
    key: "20bfa1c0-d7bf-4d5d-946e-4a1cb7ef03dc",
    label: <Paragraph>Remorse strike tartly</Paragraph>,
    value: "Remorse strike tartly",
    description: "description two",
  },
  {
    key: "6ffe69e0-998b-4158-9636-03540ce65009",
    label: <Paragraph>Operator dazzling breeding</Paragraph>,
    value: "Operator dazzling breeding",
    description: "description three",
  },
  {
    key: "a3e35e32-8326-462a-b1fd-c6273880a5cd",
    label: <Paragraph>Egestas Lorem Ullamcorper</Paragraph>,
    value: "Egestas Lorem Ullamcorper",
    description: "description one",
  },
  {
    key: "25f51fa5-66af-4208-a2a5-fbdc61bd93f8",
    label: <Paragraph>Ornare Egestas Ridiculus</Paragraph>,
    value: "Ornare Egestas Ridiculus",
    description: "description two",
  },
  {
    key: "2119b8ad-6b88-4fe4-9980-c85388830c52",
    label: <Paragraph>Ridiculus Elit Inceptos</Paragraph>,
    value: "Ridiculus Elit Inceptos",
    description: "description three",
  },
]

const Template: ComponentStory<typeof MultiSelect<(typeof basicOptions)[0]>> = (args) => {
  return <MultiSelect {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Label",
  options: basicOptions,
}

export const DontClearAfterSelect = Template.bind({})
DontClearAfterSelect.args = {
  ...Basic.args,
  clearSearchAfterSelect: false,
}

export const LargeDataset = Template.bind({})
LargeDataset.args = {
  ...Basic.args,
  options: largeDataset,
  clearSearchAfterSelect: false,
}

const ControlledTemplate: ComponentStory<typeof MultiSelect<(typeof basicOptions)[0]>> = (args) => {
  const [selectedOption, setSelectedOption] = useState([basicOptions[0]])
  return (
    <MultiSelect
      {...args}
      onSelectionChange={(options) => setSelectedOption(options)}
      value={selectedOption}
    />
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Basic.args,
  options: basicOptions,
}

export const Message = Template.bind({})
Message.args = {
  ...Basic.args,
  message: "Message.",
}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  ...Basic.args,
  message: "Error Message.",
  status: "fail",
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...Basic.args,
  inputProps: {
    "data-testid": "input-1",
  },
  optionProps: {
    "data-testid": "options",
  },
  clearButtonProps: {
    "data-testid": "clear-button",
  },
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByTestId("input-1")
  await userEvent.click(inputField)
  await expect(inputField).toHaveFocus()
  const options = canvas.getAllByTestId("options")
  await expect(options.length).toBe(3)
  await userEvent.click(options[1])
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await userEvent.click(options[2])
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await expect(options[2].getAttribute("aria-selected")).toBe("true")
  await userEvent.click(options[1])
  await expect(options[1].getAttribute("aria-selected")).toBe("false")
  await expect(options[2].getAttribute("aria-selected")).toBe("true")
  const clearButton = canvas.getByTestId("clear-button")
  await userEvent.click(clearButton)
  await expect(inputField).toHaveFocus()
  await expect(options[2].getAttribute("aria-selected")).toBe("false")
  await userEvent.click(clearButton)
  await expect(inputField).not.toHaveFocus()
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...Mouse.args,
  inputProps: {
    "data-testid": "input-1",
  },
  optionProps: {
    "data-testid": "options",
  },
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByTestId("input-1")
  inputField.focus()
  await userEvent.type(inputField, "dazzl", { delay: 10 })
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  const options = canvas.getAllByTestId("options")
  await expect(options[2].getAttribute("aria-selected")).toBe("true")
  // hit clear button
  await userEvent.keyboard("[Tab]")
  await userEvent.keyboard("[Enter]")
  await expect(options[2].getAttribute("aria-selected")).toBe("false")

  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await expect(options[2].getAttribute("aria-selected")).toBe("true")
  await userEvent.keyboard("[Backspace]")
  await userEvent.keyboard("[Backspace]")
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await expect(options[2].getAttribute("aria-selected")).toBe("false")
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(options[0].getAttribute("aria-selected")).toBe("true")
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await userEvent.keyboard("[ArrowLeft]")
  await userEvent.keyboard("[ArrowLeft]")
  await userEvent.keyboard("[Backspace]")
  await expect(options[0].getAttribute("aria-selected")).toBe("true")
  await expect(options[1].getAttribute("aria-selected")).toBe("false")
  await userEvent.keyboard("[Backspace]")
  await userEvent.keyboard("[Backspace]")
  await expect(options[0].getAttribute("aria-selected")).toBe("false")
  await userEvent.keyboard("[Escape]")
  await expect(inputField).not.toHaveFocus()
}
