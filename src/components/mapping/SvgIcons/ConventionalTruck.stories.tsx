import { Story } from "@storybook/react/types-6-0"
import conventionalTruckIcon from "../../../mapIcons/conventionalTruck.svg"

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

const Template: Story = () => <img src={conventionalTruckIcon} alt="Conventional Truck icon" />

export const Default = Template.bind({})
