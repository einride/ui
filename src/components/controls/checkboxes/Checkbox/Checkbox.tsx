import styled from "@emotion/styled"
import {
  ChangeEvent,
  CSSProperties,
  ElementType,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import { Icon } from "../../../content/Icon/Icon"

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType
  children: ReactNode
  innerWrapperStyles?: CSSProperties
  labelStyles?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  wrapperStyles?: CSSProperties
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      innerWrapperStyles = {},
      labelStyles = {},
      wrapperStyles = {},
      ...props
    },
    ref,
  ) => {
    return (
      <Wrapper style={wrapperStyles}>
        <InnerWrapper style={innerWrapperStyles}>
          <StyledInput
            id="einride-ui-checkbox"
            type="checkbox"
            {...props}
            ref={ref}
          />
          <StyledIcon name="checkmark" />
        </InnerWrapper>
        <StyledLabel htmlFor="einride-ui-checkbox" style={labelStyles}>
          {children}
        </StyledLabel>
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => 1.5 * theme.spacer}px
    ${({ theme }) => 2 * theme.spacer}px;
`

const InnerWrapper = styled.div`
  position: relative;
  display: flex;
`

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);

  &:focus-within {
    text-decoration: underline;
  }
`

const StyledInput = styled.input`
  appearance: none;
  width: ${({ theme }) => 3 * theme.spacer}px;
  height: ${({ theme }) => 3 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.spacer}px;
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.primary};
  margin-right: ${({ theme }) => 2 * theme.spacer}px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:checked {
    border: 2px solid ${({ theme }) => theme.colors.border.selected};
    background-color: ${({ theme }) => theme.colors.content.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  left: 6px;
  color: ${({ theme }) => theme.colors.background.primary};
  pointer-events: none;
`
