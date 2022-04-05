import { Story } from "@storybook/react/types-6-0"

export default {
  title: "Mapping/SvgIcons/Charger",
  parameters: {
    docs: {
      description: {
        component:
          'Import like this: `import charger from "@einride/ui/lib/mapIcons/charger.svg"`',
      },
    },
  },
}

const Template: Story = () => (
  <img src="/src/mapIcons/charger.svg" alt="Charger icon" />
)

export const Default = Template.bind({})
