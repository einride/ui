import { useTheme } from "./useTheme"

export const useWidthFromColumns = (
  columns: number | number[] | undefined,
  componentName: string,
) => {
  const theme = useTheme()
  const customProp = `--einride-ui-${componentName}`

  if (!columns) return null

  return `
  ${typeof columns === "number" ? `${customProp}: ${columns};` : ""}
  ${Array.isArray(columns) && columns[0] && `${customProp}: ${columns[0]};`}
  ${theme.breakpoint.medium} {
      ${Array.isArray(columns) && columns[1] && `${customProp}: ${columns[1]};`}
  }
  ${theme.breakpoint.large} {
    ${Array.isArray(columns) && columns[2] && `${customProp}: ${columns[2]};`}
  }

  min-width: calc(((100vw - calc(${theme.grid.columns} + 1) * ${
    theme.grid.gap
  }) / ${theme.grid.columns} + ${theme.grid.gap}) * var(${customProp}) - ${
    theme.grid.gap
  })`
}
