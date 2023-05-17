# Contributing

Thanks for showing interest in contributing to Einride UI!

## Suggesting Features

Before creating a PR, consider that Einride UI is an implementation of Einride's design system. It
has no design opinions in itself—the goal is rather to make the implementation as close to Einride's
design system as possible.

If you have ideas on how to improve design and functionality, please use
[GitHub Discussions](https://github.com/einride/ui/discussions/categories/ideas).

Developer experience (DX) is an area where Einride UI has opinions. If you have ideas on how to
improve DX, please use
[GitHub Discussions](https://github.com/einride/ui/discussions/categories/ideas) conveying your
idea, or create a PR following the [Pull Request Guidelines](#pull-request-guidelines).

## Reporting Issues

If you find a bug, please create an [issue](https://github.com/einride/ui/issues) for it, or create
a PR following the [Pull Request Guidelines](#pull-request-guidelines).

## Development

Follow these steps to start development server:

- Install dependencies by running `yarn`
- Create an local env file `.evn.local` based on `.env.example` fill in missing env values
- Start Storybook by running `yarn storybook`

## Pull Request Guidelines

Einride UI is using the [Conventional Commits](https://www.conventionalcommits.org/) commit message
convention.

Every component should come with one component file `[Component].tsx`, one Storybook file
`[Component].stories.tsx` and one documentation file `[Component].mdx`.

Before opening a PR, please make sure you get no errors when running `yarn review`.
