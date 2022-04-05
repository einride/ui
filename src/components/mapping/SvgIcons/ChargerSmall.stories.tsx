import { Story } from "@storybook/react/types-6-0"

export default {
  title: "Mapping/SvgIcons/ChargerSmall",
  parameters: {
    docs: {
      description: {
        component:
          'Import like this: `import chargerSmall from "@einride/ui/lib/mapIcons/chargerSmall.svg"`',
      },
    },
  },
}

const Template: Story = () => (
  <img src="/src/mapIcons/chargerSmall.svg" alt="Small charger icon" />
)

export const Default = Template.bind({})
