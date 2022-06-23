/* eslint-disable no-console */
import styled from "@emotion/styled"
import { Story } from "@storybook/react/types-6-0"
import { PrimaryButton } from "../../../main"
import { Icon } from "../../content/Icon/Icon"
import { Menu, MenuProps } from "./Menu"

export default {
  title: "Menus/Menu",
  component: Menu,
}

const MenuWrapper = styled.div`
  padding: 50px 0 0 300px;
`
const RandomContent = styled.p``

const Template: Story<MenuProps> = (args) => (
  <MenuWrapper>
    <Menu {...args} />
    <RandomContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum velit. In neque
      diam, consectetur suscipit velit quis, interdum condimentum mi. Cras euismod fermentum urna ut
      aliquet. Quisque sapien eros, efficitur et nisi id, pellentesque tempor odio. Nullam pharetra
      molestie magna, ut venenatis eros tempus a. Mauris justo enim, congue non magna varius, auctor
      dictum ipsum. Curabitur blandit est lobortis pharetra mattis. Vestibulum vitae luctus augue.
      Cras tincidunt dolor nec urna porta, eget interdum ligula sollicitudin. Nulla ut mi quam.
    </RandomContent>
  </MenuWrapper>
)

export const Default = Template.bind({})
Default.args = {
  trigger: <PrimaryButton>Menu item trigger</PrimaryButton>,
  menuItems: [
    {
      key: "short",
      title: "Short",
      onClick: () => console.log("Menu item 1 clicked"),
      icon: <Icon name="plus" />,
    },
    {
      key: "very-long-menu-item",
      title: "Very long menu item",
      onClick: () => console.log("Menu item 2 clicked"),
      icon: <Icon name="checkmark" />,
    },
    {
      key: "delete",
      title: "Delete",
      onClick: () => console.log("Menu item 3 clicked"),
      icon: <Icon name="checkmark" />,
    },
  ],
}
