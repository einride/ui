# Contributing

Thanks for showing interest in contributing to Einride UI!

## Suggesting Features

Before creating a PR, consider that Einride UI is an implementation of Einride's design system. In
terms of design and functionality, Einride UI has no will of its own, but the goal is rather to make
the implementation as close as Einride's design system as possible.

If you have ideas on how to improve design and functionality, please use
[GitHub Discussions](https://github.com/einride/ui/discussions/categories/ideas).

Developer experience (DX) is an area where Einride UI has a will of its own. If you have ideas for
how to improve DX, please use
[GitHub Discussions](https://github.com/einride/ui/discussions/categories/ideas) conveying your
idea, or create a PR following the [Pull Request Guidelines](#pull-request-guidelines).

## Reporting Issues

If you find a bug, please create an [issue](https://github.com/einride/ui/issues) for it, or create
a PR following the [Pull Request Guidelines](#pull-request-guidelines)

## Development

Follow these steps to start development server:

- Install dependencies by running `yarn`
- Start Storybook by running `yarn develop`

## Pull Request Guidelines

Einride UI is using the [Conventional Commits](https://www.conventionalcommits.org/) commit message
convention.

All components should come with one component file `[Component].tsx` and one Storybook file
`[Component].stories.tsx`.

Before opening a PR, please make sure you get no errors when running `yarn review`.
