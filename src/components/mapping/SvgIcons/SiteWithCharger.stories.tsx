import { Story } from "@storybook/react/types-6-0"

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

const Template: Story = () => (
  <img src="/src/mapIcons/siteWithCharger.svg" alt="Site with charger icon" />
)

export const Default = Template.bind({})
