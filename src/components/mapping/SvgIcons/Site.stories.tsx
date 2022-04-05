import { Story } from "@storybook/react/types-6-0"

export default {
  title: "Mapping/SvgIcons/Site",
  parameters: {
    docs: {
      description: {
        component:
          'Import like this: `import site from "@einride/ui/lib/mapIcons/site.svg"`',
      },
    },
  },
}

const Template: Story = () => (
  <img src="/src/mapIcons/site.svg" alt="Site icon" />
)

export const Default = Template.bind({})
