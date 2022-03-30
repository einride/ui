import { useState } from "react"

export function useDisclosure(
  initialState: boolean,
  callbacks?: { onOpen?: () => void; onClose?: () => void },
) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => {
    if (!isOpen) {
      setIsOpen(true)
      callbacks?.onOpen?.()
    }
  }

  const close = () => {
    if (isOpen) {
      setIsOpen(false)
      callbacks?.onClose?.()
    }
  }

  const toggle = () => {
    if (isOpen) close()
    else open()
  }

  return { isOpen, handlers: { open, close, toggle } }
}
