import styled from "@emotion/styled"
import {
  ChangeEvent,
  CSSProperties,
  ElementType,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react"
import { Icon } from "../../../content/Icon/Icon"

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType
  children: ReactNode
  innerWrapperStyles?: CSSProperties
  labelStyles?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  wrapperStyles?: CSSProperties
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, innerWrapperStyles = {}, labelStyles = {}, wrapperStyles = {}, ...props }, ref) => {
    const uuid = useId()

    return (
      <Wrapper style={wrapperStyles}>
        <InnerWrapper style={innerWrapperStyles}>
          <StyledInput id={uuid} type="checkbox" {...props} ref={ref} />
          <StyledIcon name="checkmark" />
        </InnerWrapper>
        <StyledLabel htmlFor={uuid} style={labelStyles}>
          {children}
        </StyledLabel>
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
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
  inline-size: ${({ theme }) => 3 * theme.spacer}px;
  block-size: ${({ theme }) => 3 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.primary};
  margin-inline-end: ${({ theme }) => 2 * theme.spacer}px;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:checked:not(:disabled) {
    border: 2px solid ${({ theme }) => theme.colors.border.selected};
    background: ${({ theme }) => theme.colors.content.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  inset-inline-start: 6px;
  color: ${({ theme }) => theme.colors.background.primary};
  pointer-events: none;
`
