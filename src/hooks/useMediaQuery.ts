import { useState, useEffect, useRef } from "react"

export const useMediaQuery = (query: string) => {
  const strippedQuery = query.replace("@media ", "")
  const [matches, setMatches] = useState(getInitialValue(strippedQuery))
  const queryRef = useRef<MediaQueryList>()

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(strippedQuery)
      setMatches(queryRef.current.matches)
      return attachMediaListener(queryRef.current, (event) =>
        setMatches(event.matches),
      )
    }
  }, [strippedQuery])

  return matches
}

const attachMediaListener = (
  query: MediaQueryList,
  callback: MediaQueryCallback,
) => {
  query.addEventListener("change", callback)
  return () => query.removeEventListener("change", callback)
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void

const getInitialValue = (query: string) => {
  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches
  }
  return false
}
