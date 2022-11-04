// eslint-disable-next-line import/no-extraneous-dependencies
import { CustomProjectConfig } from "lost-pixel"

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: "./storybook-static",
  },
  generateOnly: true,
  failOnDifference: true,
}
