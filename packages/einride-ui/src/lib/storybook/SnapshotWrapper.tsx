import styled from "@emotion/styled"
import { ReactNode } from "react"
import { BoxProps } from "../../components/layout/Box/Box"
import { Stack } from "../../components/layout/Stack/Stack"
import { EinrideProvider } from "../../contexts/EinrideProvider"
import { einrideTheme } from "../theme/einride"

interface SnapshotWrapperProps extends BoxProps {
  children?: ReactNode
}

export const SnapshotWrapper = ({ children, ...props }: SnapshotWrapperProps): JSX.Element => {
  return (
    <>
      <EinrideProvider theme={einrideTheme} colorMode="light">
        <Wrapper>
          <Stack alignItems="start" {...props}>
            {children}
          </Stack>
        </Wrapper>
      </EinrideProvider>
      <EinrideProvider theme={einrideTheme} colorMode="dark">
        <Wrapper>
          <Stack alignItems="start" {...props}>
            {children}
          </Stack>
        </Wrapper>
      </EinrideProvider>
    </>
  )
}

const Wrapper = styled.div`
  padding: ${({ theme }) => 3 * theme.spacingBase}rem;
  // set body styles
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.content.primary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
`
