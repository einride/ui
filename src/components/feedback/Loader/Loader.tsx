import styled from "@emotion/styled"
import { motion } from "framer-motion"

export const Loader = (): JSX.Element => {
  return (
    <Wrapper>
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
  height: ${({ theme }) => 3 * theme.spacer}px;
  width: ${({ theme }) => 3 * theme.spacer}px;
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Line = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  position: absolute;
  height: ${({ theme }) => 2 * theme.spacer}px;
  width: ${({ theme }) => 0.5 * theme.spacer}px;
  border-radius: ${({ theme }) => 0.5 * theme.spacer}px;
`
