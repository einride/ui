import { useState } from "react"

export function useDisclosure(
  initialState: boolean,
  callbacks?: { onOpen?: () => void; onClose?: () => void },
): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = (): void => {
    if (!isOpen) {
      setIsOpen(true)
      callbacks?.onOpen?.()
    }
  }

  const close = (): void => {
    if (isOpen) {
      setIsOpen(false)
      callbacks?.onClose?.()
    }
  }

  const toggle = (): void => {
    if (isOpen) close()
    else open()
  }

  return { isOpen, handlers: { open, close, toggle } }
}

interface UseDisclosureReturn {
  isOpen: boolean
  handlers: UseDisclosureHandlers
}

export interface UseDisclosureHandlers {
  open: () => void
  close: () => void
  toggle: () => void
}
