import { Story } from "@storybook/react/types-6-0"

export default {
  title: "Mapping/SvgIcons/ConventionalTruck",
  parameters: {
    docs: {
      description: {
        component:
          'Import like this: `import conventionalTruck from "@einride/ui/lib/mapIcons/conventionalTruck.svg"`',
      },
    },
  },
}

const Template: Story = () => (
  <img
    src="/src/mapIcons/conventionalTruck.svg"
    alt="Conventional Truck icon"
  />
)

export const Default = Template.bind({})
