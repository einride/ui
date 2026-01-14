import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { ComponentPropsWithoutRef } from "react"

export type LoaderProps = ComponentPropsWithoutRef<"div"> & {
  ref?: React.Ref<HTMLDivElement> | undefined
}

/** A loading indicator. Can be used when loading content in cards for example. Prefer using `<Skeleton>` when possible to reduce layout shift. */
export const Loader = ({ ref, ...props }: LoaderProps): React.JSX.Element => {
  return (
    <Wrapper {...props} ref={ref}>
      <Line
        animate={{
          rotate: 180,
          transition: {
            repeat: Infinity,
            ease: [0.84, 0.0, 0.33, 1.0],
            duration: 1,
          },
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.content.primary};
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto; // center the loader horizontally
`

const Line = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  position: absolute;
  block-size: ${({ theme }) => 2 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.xs};
`
