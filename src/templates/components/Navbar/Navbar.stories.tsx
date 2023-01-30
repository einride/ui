import { ComponentMeta, Story as StoryType } from "@storybook/react"
import { Box } from "../../../components/layout/Box/Box"
import { Navbar } from "./Navbar"

export default {
  title: "Templates/Wireframes/Navbar",
  component: Navbar,
  decorators: [
    (Story: StoryType) => (
      // Resetting margin from global decorator. Should be remove the global decorator, or can it be used conditionally?
      <Box marginBlockStart={-3}>
        <Story />
      </Box>
    ),
  ],
} as ComponentMeta<typeof Navbar>

export const Basic = (): JSX.Element => <Navbar />
