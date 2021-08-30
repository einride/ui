import * as React from "react";
import logoDefaultLarge from "../../../assets/logo/logo-default-large.svg";
import logoDefaultSmall from "../../../assets/logo/logo-default-small.svg";
import logoInverseLarge from "../../../assets/logo/logo-inverse-large.svg";
import logoInverseSmall from "../../../assets/logo/logo-inverse-small.svg";
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
