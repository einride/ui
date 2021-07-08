import logoDefaultLarge from "../../../assets/logo/logo-default-large.png";
import logoDefaultSmall from "../../../assets/logo/logo-default-small.png";
import logoInverseLarge from "../../../assets/logo/logo-inverse-large.png";
import logoInverseSmall from "../../../assets/logo/logo-inverse-small.png";
import { useColorMode } from "../../../lib/EinrideProvider/EinrideProvider";

export interface LogoProps {
  size?: "small" | "large";
  variant?: "default" | "inverse";
}

export const Logo = ({ size = "small", variant }: LogoProps) => {
  const colorMode = useColorMode();

  const logoDefault = () => {
    if (size === "small")
      return <img src={logoDefaultSmall} alt="Einride Logo" />;
    return <img src={logoDefaultLarge} alt="Einride Logo" />;
  };

  const logoInverse = () => {
    if (size === "small")
      return <img src={logoInverseSmall} alt="Einride Logo" />;
    return <img src={logoInverseLarge} alt="Einride Logo" />;
  };

  if (variant === "inverse" || (!variant && colorMode === "dark")) {
    return logoInverse();
  }

  return logoDefault();
};
