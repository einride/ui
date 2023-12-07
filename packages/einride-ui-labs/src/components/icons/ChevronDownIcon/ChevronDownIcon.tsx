import { SVGProps, forwardRef } from "react"

type ChevronDownIconProps = SVGProps<SVGSVGElement> & {
  size?: "sm" | "md"
}

export const ChevronDownIcon = forwardRef<SVGSVGElement, ChevronDownIconProps>(
  ({ color = "currentColor", size, ...props }, forwardedRef) => {
    if (size === "sm") {
      return (
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
          ref={forwardedRef}
        >
          <path
            d="M6.00176 7.548L11.5998 1.95L10.4478 0.815999L6.00176 5.262L1.57376 0.815999L0.403758 1.95L6.00176 7.548Z"
            fill={color}
          />
        </svg>
      )
    }
    return (
      <svg
        width="26"
        height="16"
        viewBox="0 0 26 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M13.0039 15.44L25.4439 3L22.8839 0.479998L13.0039 10.36L3.16391 0.479998L0.563906 3L13.0039 15.44Z"
          fill={color}
        />
      </svg>
    )
  },
)
