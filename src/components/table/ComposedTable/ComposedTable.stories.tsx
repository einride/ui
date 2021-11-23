import { Story } from "@storybook/react/types-6-0"
import { ComposedTable, ComposedTableProps } from "./ComposedTable"

export default {
  title: "Table/ComposedTable",
  component: ComposedTable,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=87%3A64",
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<ComposedTableProps<any, any>> = (args) => (
  <ComposedTable {...args} />
)

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
      id: "sweden",
      country: "Sweden",
      capital: "Stockholm",
      dateFormat: "YYYY-MM-DD",
      internetTLD: ".se",
    },
    {
      id: "germany",
      country: "Germany",
      capital: "Berlin",
      dateFormat: "DD.MM.YYYY",
      internetTLD: ".de",
    },
    {
      id: "brazil",
      country: "Brazil",
      capital: "Brasília",
      dateFormat: "DD/MM/YYYY",
      internetTLD: ".br",
    },
  ],
}
