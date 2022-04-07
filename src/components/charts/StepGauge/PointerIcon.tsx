import { SVGAttributes } from "react"

type PointerIconProps = SVGAttributes<SVGElement>

export const PointerIcon = ({ ...props }: PointerIconProps) => {
  return (
    <svg
      width="6"
      height="27"
      viewBox="0 0 6 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.84965 1.20539L0.712725 23.7468C0.70444 23.8292 0.700155 23.9129 0.700074 23.9976L0.699951 24.0001L0.700073 24C0.700073 25.3255 1.72979 26.4 3.00001 26.4C4.27024 26.4 5.29996 25.3255 5.29996 24C5.29996 23.9129 5.2955 23.8268 5.28682 23.742L4.14986 1.20006H4.14958C4.14958 1.2 4.14958 1.19994 4.14958 1.19988C4.14958 0.537136 3.63472 -0.00012207 2.99961 -0.00012207C2.3645 -0.00012207 1.84964 0.537136 1.84964 1.19988C1.84964 1.20172 1.84965 1.20355 1.84965 1.20539Z"
      />
    </svg>
  )
}
