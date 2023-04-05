import styled from "@emotion/styled"
import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useCallback,
  useId,
  useState,
} from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Caption } from "../../../typography/Caption/Caption"

interface SelectBaseProps extends Omit<ComponentPropsWithoutRef<"select">, "prefix"> {
  /** Options to render in select list. */
  children: ReactNode

  /** Prefix shown before select value. For example `Group by:`. */
  prefix?: ReactNode

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /**  Default is `neutral`. */
  status?: Status

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}

interface SelectWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label">
}

interface SelectWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type SelectProps = SelectBaseProps & (SelectWithLabelProps | SelectWithoutLabelProps)

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, message, placeholder, prefix, status, wrapperProps, ...props }, ref) => {
    const id = useId()
    const messageId = useId()
    const [prefixWidthPx, setPrefixWidthPx] = useState(0)
    const prefixRef = useCallback((node: HTMLDivElement | null) => {
      setPrefixWidthPx(node ? node.offsetWidth : 0)
    }, [])
    const offsetWidthRem = getOffsetWidthRem(prefixWidthPx)

    return (
      <Box {...wrapperProps}>
        {"label" in props && (
          <StyledLabel {...props.labelProps} htmlFor={id}>
            {props.label}
          </StyledLabel>
        )}
        <SelectWrapper>
          {prefix && (
            <Prefix aria-hidden ref={prefixRef}>
              {prefix}
            </Prefix>
          )}
          <StyledSelect
            {...props}
            {...(status === "fail" && { "aria-errormessage": messageId, "aria-invalid": "true" })}
            hasLabel={"label" in props}
            offsetWidthRem={offsetWidthRem}
            id={id}
            ref={ref}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {children}
          </StyledSelect>
          <StyledIcon name="chevronDown" />
        </SelectWrapper>
        {message && (
          <Caption color={getMessageColor(status)} id={messageId}>
            {message}
          </Caption>
        )}
      </Box>
    )
  },
)

type Status = "success" | "fail" | "neutral"

const getOffsetWidthRem = (prefixWidth: number | undefined): number => {
  if (prefixWidth) return (prefixWidth + 4) / 16 // add some spacing between prefix and value and convert to rem
  return 0
}

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

const StyledLabel = styled.label`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-block-start: 5px;
  margin-block-end: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

const SelectWrapper = styled.div`
  position: relative;
`

interface StyledSelectProps {
  hasLabel: boolean
  offsetWidthRem: number
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  inline-size: 100%;
  display: block;
  padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  padding-inline-start: ${({ offsetWidthRem, theme }) => offsetWidthRem + 2 * theme.spacingBase}rem;
  padding-inline-end: ${({ theme }) => 6 * theme.spacingBase}rem;
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};
  cursor: pointer;
  appearance: none;

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected} inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.content.tertiary};
    cursor: not-allowed;
  }

  & option {
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.content.primary};
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  inset-block-start: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  inset-inline-end: ${({ theme }) => theme.spacingBase}rem;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.content.primary};
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  text-align: center;
`

const Prefix = styled.div`
  position: absolute;
  inset-block: 0;
  inset-inline-start: ${({ theme }) => 2 * theme.spacingBase}rem;
  color: ${({ theme }) => theme.colors.content.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: flex;
  align-items: center;
  pointer-events: none;
`
