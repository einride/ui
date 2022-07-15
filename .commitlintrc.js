module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    // ignore dependabot commits
    (message) => /chore\(deps(-dev)?\): bump/.test(message),
  ],
}
