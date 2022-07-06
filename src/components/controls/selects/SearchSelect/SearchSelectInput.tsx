import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { ElementType, forwardRef, InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BaseInput } from "../../inputs/BaseInput/BaseInput"

interface SearchSelectInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType
  isFullWidth?: boolean
  isOpen?: boolean
  message?: ReactNode
  onClearInput: () => void
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
  ({ isFullWidth = false, isOpen, onClearInput, value, ...props }, ref) => {
    return (
      <Wrapper isFullWidth={isFullWidth}>
        <StyledBaseInput
          isFullWidth={isFullWidth}
          value={value}
          rightIcon={
            value?.length ? (
              <ClearButton type="button" onClick={onClearInput}>
                <StyledIcon name="xMark" />
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

const Wrapper = styled.div<{ isFullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const StyledBaseInput = styled(BaseInput)<{ isFullWidth?: boolean }>`
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const ClearButton = styled.button``

const StyledIcon = styled(motion(Icon))``
