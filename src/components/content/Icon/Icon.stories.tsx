import styled from "@emotion/styled"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Card } from "../../cards/Card/Card"
import { Caption } from "../../typography/Caption/Caption"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Icon, iconNames } from "./Icon"

export default {
  title: "Content/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>

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

export const All = AllTemplate.bind({})
All.args = {}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacer}px;
`

const StyledCard = styled(Card)`
  text-align: center;
`

const OneTemplate: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const One = OneTemplate.bind({})
One.args = {
  name: "checkmark",
}
