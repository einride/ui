import { useState, useEffect, useRef } from "react"

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(getInitialValue(query))
  const queryRef = useRef<MediaQueryList>()

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(query)
      setMatches(queryRef.current.matches)
      return attachMediaListener(queryRef.current, (event) =>
        setMatches(event.matches),
      )
    }
  }, [query])

  return matches
}

const attachMediaListener = (
  query: MediaQueryList,
  callback: MediaQueryCallback,
): (() => void) => {
  query.addEventListener("change", callback)
  return () => query.removeEventListener("change", callback)
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void

const getInitialValue = (query: string): boolean => {
  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches
  }
  return false
}
