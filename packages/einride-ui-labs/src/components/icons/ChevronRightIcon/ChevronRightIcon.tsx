import { SVGProps, forwardRef } from "react"

type ChevronRightIconProps = SVGProps<SVGSVGElement> & {
  size?: "sm" | "md"
}

export const ChevronRightIcon = forwardRef<SVGSVGElement, ChevronRightIconProps>(
  ({ color = "currentColor", size, ...props }, forwardedRef) => {
    if (size === "sm") {
      return (
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
          ref={forwardedRef}
        >
          <path
            d="M7.36987 5.984L1.77187 0.385999L0.637867 1.538L5.08387 5.984L0.637867 10.412L1.77187 11.582L7.36987 5.984Z"
            fill={color}
          />
        </svg>
      )
    }
    return (
      <svg
        width="15"
        height="25"
        viewBox="0 0 15 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M14.9886 12.52L2.54859 0.0799985L0.0285938 2.64L9.90859 12.52L0.0285938 22.36L2.54859 24.96L14.9886 12.52Z"
          fill={color}
        />
      </svg>
    )
  },
)
