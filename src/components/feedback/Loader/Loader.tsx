import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { HTMLAttributes } from "react"

export type LoaderProps = HTMLAttributes<HTMLDivElement>

export const Loader = (props: LoaderProps): JSX.Element => {
  return (
    <Wrapper {...props}>
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
  block-size: ${({ theme }) => 3 * theme.spacer}px;
  inline-size: ${({ theme }) => 3 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto; // center the loader horizontally
`

const Line = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  position: absolute;
  block-size: ${({ theme }) => 2 * theme.spacer}px;
  inline-size: ${({ theme }) => 0.5 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.xs};
`
