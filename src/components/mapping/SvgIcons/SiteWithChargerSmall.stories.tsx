import { Story } from "@storybook/react/types-6-0"
import siteWithChargerSmallIcon from "../../../mapIcons/siteWithChargerSmall.svg"

export default {
  title: "Mapping/SvgIcons/SiteWithChargerSmall",
  parameters: {
    docs: {
      description: {
        component:
          'Import like this: `import siteWithChargerSmall from "@einride/ui/lib/mapIcons/siteWithChargerSmall.svg"`',
      },
    },
  },
}

const Template: Story = () => (
  <img src={siteWithChargerSmallIcon} alt="Small site with charger icon" />
)

export const Default = Template.bind({})
