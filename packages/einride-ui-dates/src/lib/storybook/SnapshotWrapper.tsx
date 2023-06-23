import { Box, EinrideProvider, Stack, einrideTheme } from "@einride/ui"
import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ReactNode } from "react"

interface SnapshotWrapperProps extends ComponentPropsWithoutRef<typeof Box> {
  children?: ReactNode
}

export const SnapshotWrapper = ({
  children,
  ...props
}: SnapshotWrapperProps): React.JSX.Element => {
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