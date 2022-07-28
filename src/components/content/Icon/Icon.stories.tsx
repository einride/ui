import styled from "@emotion/styled"
import { Story } from "@storybook/react/types-6-0"
import { PrimaryCard } from "../../cards/PrimaryCard/PrimaryCard"
import { Caption } from "../../typography/Caption/Caption"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Icon, IconProps } from "./Icon"

export default {
  title: "Content/Icon",
  component: Icon,
}

const AllTemplate: Story<IconProps> = () => (
  <Wrapper>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="checkmark" />
      </Paragraph>
      <Caption font="mono">checkmark</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="warning" />
      </Paragraph>
      <Caption font="mono">warning</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="chevronDown" />
      </Paragraph>
      <Caption font="mono">chevronDown</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="chevronUp" />
      </Paragraph>
      <Caption font="mono">chevronUp</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="chevronRight" />
      </Paragraph>
      <Caption font="mono">chevronRight</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="chevronLeft" />
      </Paragraph>
      <Caption font="mono">chevronLeft</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="xMark" />
      </Paragraph>
      <Caption font="mono">xMark</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="arrowUp" />
      </Paragraph>
      <Caption font="mono">arrowUp</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="arrowDown" />
      </Paragraph>
      <Caption font="mono">arrowDown</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="arrowRight" />
      </Paragraph>
      <Caption font="mono">arrowRight</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="arrowLeft" />
      </Paragraph>
      <Caption font="mono">arrowLeft</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="arrowUpCircle" />
      </Paragraph>
      <Caption font="mono">arrowUpCircle</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="arrowDownCircle" />
      </Paragraph>
      <Caption font="mono">arrowDownCircle</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="bolt" />
      </Paragraph>
      <Caption font="mono">bolt</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="loupe" />
      </Paragraph>
      <Caption font="mono">loupe</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="plus" />
      </Paragraph>
      <Caption font="mono">plus</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="ellipsis" />
      </Paragraph>
      <Caption font="mono">ellipsis</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="plusCircle" />
      </Paragraph>
      <Caption font="mono">plusCircle</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="minusCircle" />
      </Paragraph>
      <Caption font="mono">minusCircle</Caption>
    </StyledPrimaryCard>
    <StyledPrimaryCard background="secondary">
      <Paragraph>
        <Icon name="UNSAFE_repeat" />
      </Paragraph>
      <Caption font="mono">UNSAFE_repeat</Caption>
    </StyledPrimaryCard>
  </Wrapper>
)

export const All = AllTemplate.bind({})
All.args = {}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacer}px;
`

const StyledPrimaryCard = styled(PrimaryCard)`
  text-align: center;
`

const OneTemplate: Story<IconProps> = (args) => (
  <Paragraph>
    <Icon {...args} />
  </Paragraph>
)

export const One = OneTemplate.bind({})
One.args = {
  name: "checkmark",
}
