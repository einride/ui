import type { TestRunnerConfig } from "@storybook/test-runner"
import { waitForPageReady } from "@storybook/test-runner"

import { toMatchImageSnapshot } from "jest-image-snapshot"

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot })
  },
  async postVisit(page) {
    // Awaits for the page to be loaded and available including assets (e.g., fonts)
    await waitForPageReady(page)

    // Generates a snapshot file based on the story identifier
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot()
  },
}

export default config
