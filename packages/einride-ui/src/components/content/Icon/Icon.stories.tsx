import styled from "@emotion/styled"
import { Meta, StoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Card } from "../../cards/Card/Card"
import { Caption } from "../../typography/Caption/Caption"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Text } from "../../typography/Text/Text"
import { Icon, iconNames } from "./Icon"

/** Render icons as text. */
const meta = {
  component: Icon,
  argTypes: {
    as: {
      control: false,
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

const AllIcons = (): JSX.Element => {
  return (
    <Wrapper>
      {iconNames.map((iconName) => (
        <StyledCard key={iconName} background="secondary">
          <Paragraph>
            <Icon name={iconName} />
          </Paragraph>
          <Caption font="mono">{iconName}</Caption>
        </StyledCard>
      ))}
    </Wrapper>
  )
}

export const All = {
  render: () => <AllIcons />,
} satisfies StoryObj

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: ${({ theme }) => theme.spacingBase}rem;
`

const StyledCard = styled(Card)`
  text-align: center;
`

export const One = {
  args: {
    name: "checkmark",
  },
} satisfies Story

/** Change the size of the icon by wrapping it in a text component with the desired `font-size`. That makes it simple to display text and icon side-by-side with the same size. */
export const WithLargeText = {
  render: (args) => (
    <Text variant="titleLg">
      <Icon {...args} /> Some large text
    </Text>
  ),
  args: {
    color: "secondary",
    name: "checkmark",
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper style={{ display: "block" }}>
      <AllIcons />
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
