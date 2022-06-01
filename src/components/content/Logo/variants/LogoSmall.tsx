import { forwardRef, SVGAttributes } from "react"
import { useColorScheme } from "../../../../contexts/ColorSchemeProvider"
import { color } from "../../../../primitives/color"

type LogoSmallProps = SVGAttributes<SVGSVGElement>

export const LogoSmall = forwardRef<SVGSVGElement, LogoSmallProps>((props, ref) => {
  const { colorScheme } = useColorScheme()
  const main = colorScheme === "dark" ? color.greyscale.white : color.greyscale.black
  const inverse = colorScheme === "dark" ? color.greyscale.black : color.greyscale.white

  return (
    <svg
      width="128"
      height="32"
      viewBox="0 0 128 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="title"
      {...props}
      ref={ref}
    >
      <title id="title">Einride</title>
      <path
        d="M62.5672 6.63684H60.244C60.2026 6.63681 60.1629 6.65278 60.1331 6.68142C60.1032 6.71005 60.0856 6.74913 60.084 6.79044V9.39524C60.0856 9.43656 60.1032 9.47563 60.1331 9.50426C60.1629 9.5329 60.2026 9.54887 60.244 9.54884H62.5672C62.6079 9.54884 62.647 9.53266 62.6758 9.50385C62.7046 9.47505 62.7208 9.43598 62.7208 9.39524V6.79044C62.7208 6.7497 62.7046 6.71063 62.6758 6.68183C62.647 6.65302 62.6079 6.63684 62.5672 6.63684Z"
        fill={main}
      />
      <path
        d="M62.5672 11.3793H60.244C60.2026 11.3792 60.1629 11.3952 60.1331 11.4238C60.1032 11.4525 60.0856 11.4915 60.084 11.5329V24.8577C60.084 24.9001 60.1008 24.9408 60.1308 24.9708C60.1609 25.0008 60.2015 25.0177 60.244 25.0177H62.5672C62.6085 25.016 62.6476 24.9984 62.6762 24.9686C62.7048 24.9388 62.7208 24.899 62.7208 24.8577V11.5201C62.7208 11.4793 62.7046 11.4402 62.6758 11.4114C62.647 11.3826 62.6079 11.3665 62.5672 11.3665"
        fill={main}
      />
      <path
        d="M72.1926 11.1232C71.455 11.0768 70.7168 11.2044 70.0376 11.4956C69.3584 11.7869 68.7571 12.2337 68.2822 12.8C68.2682 12.8099 68.2514 12.8152 68.2342 12.8152C68.217 12.8152 68.2002 12.8099 68.1862 12.8L67.9494 12.6848C67.9368 12.6776 67.9261 12.6674 67.9183 12.6551C67.9105 12.6429 67.9058 12.6289 67.9046 12.6144V11.52C67.9046 11.4793 67.8884 11.4402 67.8596 11.4114C67.8308 11.3826 67.7917 11.3664 67.751 11.3664H65.4278C65.3922 11.3737 65.3601 11.3928 65.3369 11.4207C65.3136 11.4487 65.3005 11.4837 65.2998 11.52V24.8576C65.2998 24.9 65.3167 24.9407 65.3467 24.9707C65.3767 25.0007 65.4174 25.0176 65.4598 25.0176H67.783C67.8243 25.0159 67.8634 24.9984 67.892 24.9685C67.9207 24.9387 67.9366 24.8989 67.9366 24.8576V17.6896C67.9366 14.9504 69.031 13.3312 71.335 13.3312C73.8438 13.3312 74.151 15.1808 74.151 17.1328V24.8576C74.151 24.8989 74.1669 24.9387 74.1956 24.9685C74.2242 24.9984 74.2633 25.0159 74.3046 25.0176H76.6278C76.6702 25.0176 76.7109 25.0007 76.7409 24.9707C76.7709 24.9407 76.7878 24.9 76.7878 24.8576V16.4224C76.7878 13.2544 75.5078 11.1232 72.2246 11.1232"
        fill={main}
      />
      <path
        d="M90.5095 6.63684H88.1863C88.1456 6.63684 88.1065 6.65302 88.0777 6.68183C88.0489 6.71063 88.0327 6.7497 88.0327 6.79044V9.39524C88.0327 9.43598 88.0489 9.47505 88.0777 9.50385C88.1065 9.53266 88.1456 9.54884 88.1863 9.54884H90.5095C90.5509 9.54887 90.5906 9.5329 90.6204 9.50426C90.6503 9.47563 90.6679 9.43656 90.6695 9.39524V6.79044C90.6679 6.74913 90.6503 6.71005 90.6204 6.68142C90.5906 6.65278 90.5509 6.63681 90.5095 6.63684Z"
        fill={main}
      />
      <path
        d="M90.5095 11.3793H88.1863C88.1456 11.3793 88.1065 11.3954 88.0777 11.4242C88.0489 11.453 88.0327 11.4921 88.0327 11.5329V24.8577C88.0327 24.899 88.0487 24.9388 88.0773 24.9686C88.1059 24.9984 88.145 25.016 88.1863 25.0177H90.5095C90.5519 25.0177 90.5926 25.0008 90.6226 24.9708C90.6527 24.9408 90.6695 24.9001 90.6695 24.8577V11.5201C90.6679 11.4787 90.6503 11.4397 90.6204 11.411C90.5906 11.3824 90.5509 11.3664 90.5095 11.3665"
        fill={main}
      />
      <path
        d="M105.364 6.63684H103.06C103.019 6.63684 102.98 6.65302 102.951 6.68183C102.923 6.71063 102.906 6.7497 102.906 6.79044V12.672C102.906 12.6885 102.902 12.7045 102.893 12.7182C102.883 12.7319 102.87 12.7425 102.855 12.7488L102.599 12.832C102.586 12.8399 102.57 12.844 102.554 12.844C102.539 12.844 102.523 12.8399 102.51 12.832C102.047 12.2694 101.458 11.8234 100.791 11.5299C100.124 11.2364 99.3974 11.1037 98.6697 11.1424C95.5017 11.1424 92.7881 13.7792 92.7881 18.24C92.7881 22.7008 95.5017 25.3632 98.6697 25.3632C99.4108 25.4056 100.151 25.271 100.83 24.9705C101.509 24.6701 102.107 24.2124 102.574 23.6352C102.587 23.6231 102.604 23.6163 102.622 23.6163C102.64 23.6163 102.657 23.6231 102.67 23.6352L102.887 23.7376C102.9 23.7449 102.911 23.755 102.918 23.7673C102.926 23.7796 102.931 23.7936 102.932 23.808V24.896C102.932 24.9374 102.948 24.9771 102.977 25.007C103.005 25.0368 103.044 25.0544 103.086 25.056H105.409C105.451 25.056 105.492 25.0392 105.522 25.0092C105.552 24.9792 105.569 24.9385 105.569 24.896V6.79044C105.567 6.74913 105.55 6.71005 105.52 6.68142C105.49 6.65278 105.45 6.63681 105.409 6.63684H105.364ZM99.2201 23.1424C97.0185 23.1424 95.5465 21.2928 95.5465 18.2208C95.5465 15.1488 97.0185 13.3312 99.2201 13.3312C101.249 13.3312 102.977 14.848 102.977 18.2208C102.977 21.5936 101.249 23.1424 99.2201 23.1424Z"
        fill={main}
      />
      <path
        d="M114.157 11.1232C110.279 11.1232 107.438 13.9392 107.438 18.1632C107.438 22.1184 109.844 25.3376 114.228 25.3376C117.575 25.3376 119.63 23.3856 120.308 21.2032C120.315 21.1797 120.317 21.1548 120.312 21.1306C120.308 21.1065 120.298 21.0837 120.282 21.0642C120.267 21.0448 120.248 21.0293 120.226 21.0189C120.203 21.0086 120.179 21.0037 120.154 21.0048H117.78C117.75 21.0037 117.721 21.0117 117.696 21.0277C117.67 21.0437 117.651 21.067 117.639 21.0944C117.044 22.336 115.988 23.0848 114.106 23.0848C112.001 23.0848 110.478 21.6064 110.145 19.1808C110.142 19.1583 110.144 19.1354 110.151 19.1137C110.158 19.092 110.169 19.072 110.184 19.0551C110.199 19.0381 110.218 19.0246 110.239 19.0154C110.259 19.0061 110.282 19.0015 110.305 19.0016H120.365C120.386 19.0025 120.406 18.9994 120.425 18.9924C120.444 18.9855 120.461 18.9749 120.476 18.9612C120.491 18.9475 120.503 18.9311 120.511 18.9127C120.52 18.8944 120.525 18.8746 120.525 18.8544C120.743 14.4896 118.292 11.1168 114.125 11.1168L114.157 11.1232ZM117.607 16.9216H110.382C110.359 16.9209 110.338 16.9156 110.318 16.906C110.297 16.8964 110.28 16.8827 110.265 16.8658C110.251 16.849 110.24 16.8293 110.234 16.8081C110.227 16.7868 110.225 16.7645 110.228 16.7424C110.65 14.2656 112.148 13.2736 114.132 13.2736C115.074 13.2679 115.981 13.6286 116.662 14.2795C117.342 14.9304 117.743 15.8205 117.78 16.7616C117.781 16.7832 117.777 16.8047 117.77 16.8248C117.762 16.845 117.75 16.8634 117.735 16.8789C117.72 16.8945 117.702 16.9068 117.683 16.9153C117.663 16.9237 117.641 16.928 117.62 16.928"
        fill={main}
      />
      <path
        d="M85.9271 11.3793H80.5703C80.4055 11.3799 80.2473 11.4441 80.1287 11.5585L79.1495 12.5377C79.0312 12.6569 78.9646 12.8178 78.9639 12.9857V24.8577C78.9639 24.9001 78.9807 24.9408 79.0107 24.9708C79.0407 25.0008 79.0814 25.0177 79.1239 25.0177H81.4471C81.4895 25.0177 81.5302 25.0008 81.5602 24.9708C81.5902 24.9408 81.6071 24.9001 81.6071 24.8577V13.9777C81.6071 13.9369 81.6232 13.8978 81.6521 13.869C81.6809 13.8402 81.7199 13.8241 81.7607 13.8241H85.9271C85.9684 13.8224 86.0075 13.8048 86.0361 13.775C86.0647 13.7452 86.0807 13.7054 86.0807 13.6641V11.5201C86.0807 11.4793 86.0645 11.4402 86.0357 11.4114C86.0069 11.3826 85.9678 11.3665 85.9271 11.3665"
        fill={main}
      />
      <path
        d="M51.7512 11.0271C47.8408 11.0271 44.98 13.8623 44.98 18.1311C44.98 22.1183 47.4056 25.3631 51.828 25.3631C55.2008 25.3631 57.2744 23.3919 57.9528 21.1967C57.9596 21.1734 57.961 21.1488 57.9569 21.1248C57.9528 21.1009 57.9433 21.0781 57.9291 21.0584C57.915 21.0386 57.8964 21.0224 57.875 21.0109C57.8536 20.9994 57.8299 20.9929 57.8056 20.9919H55.4248C55.3957 20.9937 55.3675 21.0029 55.3428 21.0186C55.3182 21.0342 55.298 21.0559 55.284 21.0815C54.6888 22.3615 53.62 23.0911 51.7256 23.0911C49.6008 23.0911 48.0648 21.5999 47.732 19.1487C47.7302 19.1266 47.733 19.1044 47.7403 19.0835C47.7475 19.0626 47.759 19.0434 47.7741 19.0272C47.7891 19.011 47.8073 18.998 47.8276 18.9892C47.8479 18.9804 47.8698 18.9758 47.892 18.9759H58.0424C58.0833 18.9744 58.1222 18.958 58.1517 18.9296C58.1812 18.9013 58.1993 18.8631 58.2024 18.8223C58.42 14.4255 55.9432 11.0271 51.7512 11.0271ZM55.2648 16.8767H47.9496C47.9269 16.8769 47.9043 16.8722 47.8836 16.863C47.8628 16.8538 47.8442 16.8402 47.8291 16.8233C47.8139 16.8063 47.8026 16.7863 47.7958 16.7646C47.789 16.743 47.7869 16.7201 47.7896 16.6975C48.2184 14.1951 49.7096 13.1967 51.7256 13.1967C52.6781 13.1859 53.5974 13.5469 54.2881 14.203C54.9788 14.859 55.3865 15.7585 55.4248 16.7103C55.4256 16.7318 55.4221 16.7533 55.4145 16.7735C55.4068 16.7937 55.3952 16.8121 55.3802 16.8276C55.3653 16.8431 55.3474 16.8555 55.3275 16.8639C55.3077 16.8724 55.2863 16.8767 55.2648 16.8767Z"
        fill={main}
      />
      <path d="M32.02 0H0.0200195V32H32.02V0Z" fill={main} />
      <path
        d="M21.2039 19.0465L14.4007 11.1105C14.368 11.0733 14.3498 11.0256 14.3495 10.9761V6.43848H10.5991V12.0705C10.6026 12.3046 10.6861 12.5305 10.8359 12.7105L17.6391 20.6465C17.6714 20.6813 17.6897 20.7269 17.6903 20.7745V25.5489H21.4407V19.6993C21.4424 19.4604 21.3584 19.2287 21.2039 19.0465Z"
        fill={inverse}
      />
    </svg>
  )
})
