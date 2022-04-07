import { Story } from "@storybook/react/types-6-0"
import chargerIcon from "../../../mapIcons/charger.svg"

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

const Template: Story = () => <img src={chargerIcon} alt="Charger icon" />

export const Default = Template.bind({})
