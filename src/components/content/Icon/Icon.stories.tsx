import styled from "@emotion/styled"
import { ComponentMeta, ComponentStoryObj, ComponentStory } from "@storybook/react"
import { Card } from "../../cards/Card/Card"
import { Caption } from "../../typography/Caption/Caption"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Icon, iconNames } from "./Icon"

export default {
  title: "Content/Icon",
  component: Icon,
} satisfies ComponentMeta<typeof Icon>

type Story = ComponentStoryObj<typeof Icon>

const AllTemplate: ComponentStory<typeof Icon> = () => (
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

export const All = {
  args: {},
  render: ({ name }) => <AllTemplate name={name} />,
} satisfies Story

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
