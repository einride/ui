import "../src/styles/typography.css";
import "../src/styles/variables.css";
import "../src/styles/main.css";

const customViewports = {
  mobile: {
    name: "Mobile",
    styles: {
      width: "360px",
      height: "812px",
    },
  },
  tabletPortrait: {
    name: "Tablet portrait",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  tabletLandscape: {
    name: "Tablet landscape",
    styles: {
      width: "1024px",
      height: "768px",
    },
  },
  desktop: {
    name: "Desktop",
    styles: {
      width: "1440px",
      height: "900px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: { viewports: customViewports },
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#ffffff" },
      { name: "dark", value: "#121212" },
    ],
  },
  grid: {
    cellSize: 10,
    gridOn: false,
    columns: 8,
    gap: "10px",
    gutter: "15px",
    maxWidth: "1440px",
  },
};
