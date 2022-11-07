import { ComponentMeta } from "@storybook/react"
import { PrimaryButton } from "../controls/buttons/PrimaryButton/PrimaryButton"
import { VisuallyHidden } from "./VisuallyHidden"

export default {
  title: "VisuallyHidden/VisuallyHidden",
  component: VisuallyHidden,
} as ComponentMeta<typeof VisuallyHidden>

export const Basic = (): JSX.Element => {
  return (
    <PrimaryButton>
      Update
      <VisuallyHidden>user with name Filip</VisuallyHidden>
    </PrimaryButton>
  )
}
