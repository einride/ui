import { Story } from "@storybook/react/types-6-0"
import siteWithChargerIcon from "../../../mapIcons/siteWithCharger.svg"

export default {
  title: "Mapping/SvgIcons/SiteWithCharger",
  parameters: {
    docs: {
      description: {
        component:
          'Import like this: `import siteWithCharger from "@einride/ui/lib/mapIcons/siteWithCharger.svg"`',
      },
    },
  },
}

const Template: Story = () => <img src={siteWithChargerIcon} alt="Site with charger icon" />

export const Default = Template.bind({})
