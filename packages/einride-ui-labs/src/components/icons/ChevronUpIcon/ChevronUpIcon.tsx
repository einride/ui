import { SVGProps, forwardRef } from "react"

type ChevronUpIconProps = SVGProps<SVGSVGElement> & {
  size?: "sm" | "md"
}

export const ChevronUpIcon = forwardRef<SVGSVGElement, ChevronUpIconProps>(
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
            d="M6.00176 0.383999L0.403758 5.982L1.57376 7.116L6.00176 2.67L10.4478 7.116L11.5998 5.982L6.00176 0.383999Z"
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
          d="M13.0039 0.519999L0.563906 12.96L3.16391 15.48L13.0039 5.6L22.8839 15.48L25.4439 12.96L13.0039 0.519999Z"
          fill={color}
        />
      </svg>
    )
  },
)
