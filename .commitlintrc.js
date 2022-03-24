module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    // ignore dependabot messages
    (message) => /^Bumps \[.+]\(.+\) from .+ to .+\.$/m.test(message),
  ],
}
