import { ReactNode } from "react"
import { Stack } from "../../components/layout/Stack/Stack"

interface SnapshotWrapperProps {
  children?: ReactNode
}

export const SnapshotWrapper = ({ children }: SnapshotWrapperProps): JSX.Element => {
  return <Stack alignItems="start">{children}</Stack>
}
