# @einride/ui

[![license](https://img.shields.io/npm/l/@einride/ui.svg)](https://github.com/einride/ui/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@einride/ui.svg)](https://www.npmjs.com/package/@einride/ui) [![total npm downloads](https://img.shields.io/npm/dt/@einride/ui.svg)](https://www.npmjs.com/package/@einride/ui)

This package provides reusable React components that adhere to Einride's design system.

## Installation

Install this component system with NPM or Yarn:

```bash
# npm
npm install @einride/ui

# yarn
yarn add @einride/ui
```

## Setup

For @einride/ui to work, `EinrideProvider` needs to wrap all other components. Add it in the root component in your app like this:

```tsx
import { EinrideProvider } from "@einride/ui";

const App = () => {
  return (
    <EinrideProvider>{/* All other components go here! */}</EinrideProvider>
  );
};

export default App;
```

## Documentation

All currently available components are documented in our [Storybook](https://master--606dcc0a2208ee00215fb2d9.chromatic.com/).

Here's a couple of examples of the visual look and feel:

![A sneak peak on design system typography](https://i.ibb.co/FX6bSJ2/sneakpeak-typography.jpg)
![A sneak peak on design system controls](https://i.ibb.co/wLR7bhb/sneakpeak-controls.jpg)

## License

@einride/ui is licensed under the [MIT License](LICENSE).
