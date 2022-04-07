import { Story } from "@storybook/react/types-6-0"
import siteSmallIcon from "../../../mapIcons/siteSmall.svg"

export default {
  title: "Mapping/SvgIcons/SiteSmall",
  parameters: {
    docs: {
      description: {
        component:
          'Import like this: `import siteSmall from "@einride/ui/lib/mapIcons/siteSmall.svg"`',
      },
    },
  },
}

const Template: Story = () => <img src={siteSmallIcon} alt="Small Site icon" />

export const Default = Template.bind({})
