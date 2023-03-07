# @einride/ui

[![license](https://img.shields.io/npm/l/@einride/ui.svg)](https://github.com/einride/ui/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@einride/ui.svg)](https://www.npmjs.com/package/@einride/ui)
[![total npm downloads](https://img.shields.io/npm/dt/@einride/ui.svg)](https://www.npmjs.com/package/@einride/ui)

Reusable React components that adhere to Einride's design system.

## Installation

Install @einride/ui together with its peer dependencies:

```bash
yarn add @einride/ui @emotion/react @emotion/styled framer-motion
```

## Setup

`<EinrideProvider>` needs to wrap all @einride/ui components. The provider sets up the theme and
color schemes. It's common to put it in the `<App>` component in the top of the component tree.

```tsx
import { EinrideProvider } from "@einride/ui"

export const App = (): JSX.Element => {
  return <EinrideProvider>{/* All @einride/ui components go here! */}</EinrideProvider>
}
```

## Run Storybook locally

Config a mapbox api key and start storybook:

* `cp .env.example .env`
* add `VITE_MAPBOX_TOKEN`
* `yarn run storybook`

## Contribute

See [Contributing Guide](https://github.com/einride/ui/blob/main/CONTRIBUTING.md).

## Documentation

All currently available components are documented in our
[Storybook](https://main--606dcc0a2208ee00215fb2d9.chromatic.com/).

## License

MIT
