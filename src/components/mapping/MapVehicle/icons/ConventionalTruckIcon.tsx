import { forwardRef, SVGAttributes } from "react"

type ConventionalTruckIconProps = SVGAttributes<SVGSVGElement>

export const ConventionalTruckIcon = forwardRef<
  SVGSVGElement,
  ConventionalTruckIconProps
>(({ ...props }, ref) => {
  return (
    <svg
      width="40"
      height="12"
      viewBox="0 0 40 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <rect
        x="31"
        y="10.9854"
        width="10"
        height="3"
        transform="rotate(-90 31 10.9854)"
        fill="#747474"
      />
      <path
        d="M0.650406 11.9854C0.291198 11.9854 -1.27286e-08 11.6942 -2.84301e-08 11.3349L-4.95466e-07 0.650405C-5.11168e-07 0.291196 0.291196 -1.27286e-08 0.650405 -2.84301e-08L30.8496 -1.34848e-06C31.2088 -1.36418e-06 31.5 0.291195 31.5 0.650404L31.5 11.3349C31.5 11.6942 31.2088 11.9854 30.8496 11.9854L0.650406 11.9854Z"
        fill="white"
      />
      <path
        d="M31.5 10.9854L31.5 0.985352L32.1748 0.985352C32.3544 0.985352 32.5 1.13095 32.5 1.31055L32.5 10.6601C32.5 10.8398 32.3544 10.9854 32.1748 10.9854L31.5 10.9854Z"
        fill="#ABABAB"
      />
      <path
        d="M33.7124 11.9854C33.3299 11.9854 33.0293 11.6582 33.0603 11.2769C33.1564 10.0982 33.3333 7.69482 33.3333 5.98535C33.3333 4.27731 33.1567 1.88433 33.0606 0.708706C33.0294 0.327341 33.3301 -1.44278e-08 33.7127 -3.11534e-08L37.6667 -2.03986e-07L39.4328 0.227944C39.7572 0.269803 40 0.545974 40 0.872999L40 11.1013C40 11.4267 39.7594 11.7021 39.4368 11.7458L37.6667 11.9854L33.7124 11.9854Z"
        fill="#222222"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.8329 -2.48003e-05L39.4392 0.223089C39.7608 0.267752 40.0002 0.542676 40.0002 0.86731L40.0002 11.1175C40.0002 11.4421 39.7608 11.7171 39.4392 11.7617L37.7237 12L37.7236 12L37.7236 -2.47955e-05L37.8329 -2.48003e-05Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.0002 1.5172L40.0002 10.4525L37.7236 10.9849L37.7236 0.984863L40.0002 1.5172Z"
        fill="#121212"
      />
    </svg>
  )
})
