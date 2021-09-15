module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/github",
    "@semantic-release/npm",
  ],
  // prevent @semantic-release/github from creating issues due to failed releases
  fail: false,
  // present @semantic-release/github from updating PRs and issues due to resolved releases
  success: false,
  // @semantic/release/npm needs to know what directory path should be published
  pkgRoot: "../../",
}
