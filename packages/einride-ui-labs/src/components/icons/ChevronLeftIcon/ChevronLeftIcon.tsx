import { SVGProps, forwardRef } from "react"

type ChevronLeftIconProps = SVGProps<SVGSVGElement> & {
  size?: "sm" | "md"
}

export const ChevronLeftIcon = forwardRef<SVGSVGElement, ChevronLeftIconProps>(
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
            d="M0.637867 5.984L6.23587 11.582L7.36987 10.43L2.92387 5.984L7.36987 1.556L6.23587 0.385999L0.637867 5.984Z"
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
          d="M0.0285938 12.52L12.4686 24.96L14.9886 22.4L5.10859 12.52L14.9886 2.68L12.4686 0.0799985L0.0285938 12.52Z"
          fill={color}
        />
      </svg>
    )
  },
)
