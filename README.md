# Einride UI

[![license](https://img.shields.io/npm/l/@einride/ui.svg)](https://github.com/einride/ui/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@einride/ui.svg)](https://www.npmjs.com/package/@einride/ui)
[![total npm downloads](https://img.shields.io/npm/dt/@einride/ui.svg)](https://www.npmjs.com/package/@einride/ui)

Reusable React components that adhere to Einride's design system.

Einride UI consists of these packages:

- [`@einride/ui`](./packages/einride-ui/): Core UI components.
- [`@einride/ui-maps`](./packages/einride-ui-maps/): Mapping components.

## Installation

Install `@einride/ui` together with its peer dependencies:

```bash
yarn add @einride/ui @emotion/react @emotion/styled framer-motion
```

Install `@einride/ui-maps` if you have a need of showing maps.

## Setup

`<EinrideProvider>` needs to wrap all @einride/ui components. The provider sets up the theme and
color schemes. It's common to put it in the `<App>` component in the top of the component tree.

```tsx
import { EinrideProvider } from "@einride/ui"

export const App = (): React.JSX.Element => {
  return <EinrideProvider>{/* All @einride/ui components go here! */}</EinrideProvider>
}
```

## Contribute

See [Contributing Guide](./CONTRIBUTING.md).

## Documentation

All currently available components are documented in our
[Storybook](https://storybook.einride.tech/).

## License

MIT
