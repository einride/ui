import styled from "@emotion/styled"
import { motion } from "framer-motion"
import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  LabelHTMLAttributes,
  MouseEvent,
  ReactNode,
  forwardRef,
} from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BaseInput, MessageProps } from "../../inputs/BaseInput/BaseInput"

interface SearchSelectInputBaseProps extends ComponentPropsWithoutRef<"input"> {
  as?: ElementType

  /** Props passed to the clear button element. */
  clearButtonProps?: ButtonHTMLAttributes<HTMLButtonElement> | undefined

  isOpen?: boolean
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: MessageProps

  onClearInput: (e: MouseEvent<HTMLButtonElement>) => void
  status?: Status
  value: string | undefined
}

interface SearchSelectInputWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

interface SearchSelectInputWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type SearchSelectInputProps = SearchSelectInputBaseProps &
  (SearchSelectInputWithLabelProps | SearchSelectInputWithoutLabelProps)

export const SearchSelectInput = forwardRef<HTMLInputElement, SearchSelectInputProps>(
  ({ clearButtonProps, isOpen, onClearInput, value, ...props }, ref) => {
    return (
      <Wrapper>
        <StyledBaseInput
          value={value}
          rightIcon={
            value?.length ? (
              <ClearButton type="button" onClick={onClearInput} {...clearButtonProps}>
                <Icon name="xMark" />
              </ClearButton>
            ) : (
              <StyledIcon name="chevronRight" animate={{ rotate: isOpen ? 90 : 0 }} />
            )
          }
          {...props}
          ref={ref}
        />
      </Wrapper>
    )
  },
)

type Status = "success" | "fail" | "neutral"

const Wrapper = styled.div`
  position: relative;
`

const StyledBaseInput = styled(BaseInput)``

const ClearButton = styled.button`
  inline-size: 100%;
  block-size: 100%;
  border-radius: ${({ theme }) => theme.borderRadii.sm};

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 0.0625rem ${({ theme }) => theme.colors.border.selected};
  }
`

const StyledIcon = styled(motion(Icon))``
