import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { ElementType, forwardRef, InputHTMLAttributes, ReactNode } from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Caption } from "../../../typography/Caption/Caption"
import { BaseInput } from "../../inputs/BaseInput/BaseInput"

export interface SearchSelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  "aria-label": string
  as?: ElementType
  isFullWidth?: boolean
  isOpen?: boolean
  message?: ReactNode
  onClearInput: () => void
  status?: Status
  value: string | undefined
}

export const SearchSelectInput = forwardRef<HTMLInputElement, SearchSelectInputProps>(
  ({ isFullWidth = false, isOpen, message, onClearInput, status, value, ...props }, ref) => {
    return (
      <>
        <Wrapper isFullWidth={isFullWidth}>
          <StyledBaseInput isFullWidth={isFullWidth} value={value} {...props} ref={ref} />
          {value?.length ? (
            <ClearButton type="button" onClick={onClearInput}>
              <StyledIcon name="xMark" />
            </ClearButton>
          ) : (
            <StyledIcon name="chevronRight" animate={{ rotate: isOpen ? 90 : 0 }} />
          )}
        </Wrapper>
        {message && <Caption color={getMessageColor(status)}>{message}</Caption>}
      </>
    )
  },
)

type Status = "success" | "fail" | "neutral"

const getMessageColor = (status: Status | undefined): ContentColor => {
  switch (status) {
    case "success":
      return "positive"
    case "fail":
      return "negative"
    default:
      return "secondary"
  }
}

const Wrapper = styled.div<{ isFullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const StyledBaseInput = styled(BaseInput)<{ isFullWidth?: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
  padding-right: ${({ theme }) => 5 * theme.spacer}px;
`

const ClearButton = styled.button``

const StyledIcon = styled(motion(Icon))`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  right: ${({ theme }) => theme.spacer}px;
  color: ${({ theme }) => theme.colors.content.primary};
  width: ${({ theme }) => 3 * theme.spacer}px;
  text-align: center;
`
