import { Story } from "@storybook/react/types-6-0"
import { Table, TableProps } from "./Table"

export default {
  title: "Table/Table",
  component: Table,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=87%3A64",
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<TableProps<any, any>> = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
  headers: [
    {
      key: "country",
      displayText: "Country",
    },
    {
      key: "capital",
      displayText: "Capital",
    },
    {
      key: "dateFormat",
      displayText: "Date format",
    },
    {
      key: "internetTLD",
      displayText: "Internet TLD",
    },
  ],
  rows: [
    {
      country: "Sweden",
      capital: "Stockholm",
      dateFormat: "YYYY-MM-DD",
      internetTLD: ".se",
    },
    {
      country: "Germany",
      capital: "Berlin",
      dateFormat: "DD.MM.YYYY",
      internetTLD: ".de",
    },
    {
      country: "Brazil",
      capital: "Brasília",
      dateFormat: "DD/MM/YYYY",
      internetTLD: ".br",
    },
  ],
}
