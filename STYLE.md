# Style

We're using
[Einride Frontend Style Guide](https://einride.engineering/docs/tech-radar/frontend/techniques/einride-frontend-style-guide)
as a base.

In addition, here follows a few project specific styling conventions.

## Components

- Both
  [controlled and uncontrolled API](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
  should be supported whenever applicable.

As an example, make sure `value` and `onChange` props are optional rather than required for input
components and also support `defaultValue`.

- Make it easy to pass the right props while making it possible to pass something else.

As an example, let `gap` auto-suggest on officially supported variants such as `"md"` and `"lg"`,
while keeping it possible to pass a custom number if needed.

- Wrap component in `forwardRef()` whenever applicable.

It makes it possible to use libraries such as `framer-motion` on the consumer side and enables
passing a `ref` for any other reason.

```tsx
// bad
const Component = ({ ...props }: ComponentProps): JSX.Element => {
  return <div {...props} />
}

// good
const Component = forwardRef<HTMLDivElement, ComponentProps>(({ ...props }, ref): JSX.Element => {
  return <div {...props} ref={ref} />
})
```

- Place component interface and function first in each component file.

It makes the contract of the component fast to discover.

```tsx
// bad
const helper = () => {...}

const constant1 = ...
const constant2 = ...

const SubComponent = () => {}

interface ComponentProps {...}

const Component = () => {...}

// good
interface ComponentProps {...}

const Component = () => {...}

const helper = () => {...}

const constant1 = ...
const constant2 = ...

const SubComponent = () => {...}
```

## Stories

- Rely on automatic titles whenever possible.

It ensures hierarchy is the same in code and Storybook, which improves discoverability.

```tsx
// ./src/components/typography/Text/Text.stories.tsx

// bad
const meta = {
  title: "Typography/Text", // explicit title, might cause mismatch compared to file structure
  component: Text,
} satisfies Meta<typeof Text>

// good
const meta = {
  // implicit title, uses same structure as code
  component: Text,
} satisfies Meta<typeof Text>
```

- Use the following way of typing metadata and stories.

```tsx
const meta = {
  component: Text,
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const MyStory = {} satisfies Story
```

`satisfies` gives benefits related to
[improved typing accuracy](https://storybook.js.org/blog/improved-type-safety-in-storybook-7/).
Using `StoryObj<typeof meta>` makes it possible to combine type information from metadata and
individual story.

- Prefer arg-style stories to changing args in render function.

```tsx
// bad
export const Primary = {
  render: () => <Text>Text</Text>,
} satisfies Story

export const Secondary = {
  render: () => <Text color="secondary">Text</Text>,
} satisfies Story

// good
export const Primary = {
  args: {
    children: <>Text</>,
  },
} satisfies Story

export const Secondary = {
  args: {
    ...Primary.args,
    color: "secondary",
  },
} satisfies Story
```

Using args unlocks the full potential of Storybook by enabling changing args in the UI and reusing
args in many stories.

- Use interaction testing to ensure interactive components are possible to use both with pointer and
  keyboard. Every interactive component should have one `Pointer` story and one `Keyboard` story
  with an associated `play` function that navigates the component.

```tsx
// Example interaction test for pointer navigation
export const Pointer = {
  args: {
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: Pointer.args.children })
    await expect(button).not.toHaveFocus()
    await userEvent.click(button)
    await expect(button).toHaveFocus()
  },
} satisfies Story

// Example interaction test for keyboard navigation
export const Keyboard = {
  args: {
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: Keyboard.args.children })
    await expect(button).not.toHaveFocus()
    await userEvent.tab()
    await expect(button).toHaveFocus()
  },
} satisfies Story
```

- Every component should have a `Snapshot` story at the end of the file used for visual regression
  testing.

Combining multiple stories in one `Snapshot` story makes it possible to decrease
[cost related to monthly amount of snapshots](https://www.chromatic.com/pricing).
`<SnapshotWrapper>` ensures both color schemes are tested without extra configuration.

```tsx
export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, FullWidth, IconRight, Disabled].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PrimaryButton key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies StoryObj
```

- Prefer querying elements with `getByRole` in interaction tests to other query types such as
  `getByTestId` and `getByText`.

```tsx
// bad
export const Basic = {
  args: {
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByText("Button")
  },
} satisfies Story

// good
export const Basic = {
  args: {
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Button" })
  },
} satisfies Story
```

Querying by ARIA role and accessibility name ensures certain accessibility requirements for free.
