# @einride/ui

[![license](https://img.shields.io/npm/l/@einride/ui.svg)](https://github.com/einride/ui/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@einride/ui.svg)](https://www.npmjs.com/package/@einride/ui)
[![total npm downloads](https://img.shields.io/npm/dt/@einride/ui.svg)](https://www.npmjs.com/package/@einride/ui)

This package provides reusable React components that adhere to Einride's design
system.

## Installation

Install @einride/ui together with its peer dependencies with NPM or Yarn:

```bash
# npm
npm install @einride/ui @emotion/react @emotion/styled framer-motion

# yarn
yarn add @einride/ui @emotion/react @emotion/styled framer-motion
```

## Setup

For @einride/ui to work, `EinrideProvider` needs to wrap all other components.
Add it in the root component in your app like this:

```tsx
import { EinrideProvider } from "@einride/ui"

export const App = () => {
  return (
    <EinrideProvider>{/* All other components go here! */}</EinrideProvider>
  )
}
```

## Contribute

If you want to contribute to `@einride/ui` create a PR following
[semantic release](https://semantic-release.gitbook.io/semantic-release/).

To develop you need to install it's dependencies and then start storybook to
make sure your updates work as expected. Please always provide both a
`Component.tsx` and a `Component.storybook.tsx`.

```bash
make install
make develop
```

Before committing a PR please make sure all checks pass

```bash
make all
```

## Documentation

All currently available components are documented in our
[Storybook](https://main--606dcc0a2208ee00215fb2d9.chromatic.com/).

## License

MIT
