import { ComponentMeta } from "@storybook/react"
import { Navbar } from "./Navbar"

export default {
  title: "Templates/Wireframes/Navbar",
  component: Navbar,
  args: { style: { paddingBlockStart: 0 } },
} as ComponentMeta<typeof Navbar>

export const Basic = (): JSX.Element => <Navbar />
