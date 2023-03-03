/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    environment: "happy-dom",
  },
})
