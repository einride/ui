import { Story } from "@storybook/react/types-6-0"

export default {
  title: "Mapping/SvgIcons/Pod",
  parameters: {
    docs: {
      description: {
        component:
          'Import like this: `import charger from "@einride/ui/lib/mapIcons/pod.svg"`',
      },
    },
  },
}

const Template: Story = () => <img src="/src/mapIcons/pod.svg" alt="Pod icon" />

export const Default = Template.bind({})
