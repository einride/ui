# Usage

## Generage usage report

1. Add a file called `react-scanner.config.js` to root with this content:

```js
module.exports = {
  crawlFrom: "./src",
  importedFrom: "@einride/ui",
  processors: [["count-components-and-props", { outputTo: "./usage-report.json" }]],
}
```

2. Run `npx react-scanner -c ./react-scanner.config.js`

3. Copy `usage-report.json` to `./src/usage/reports/{project}.ts` where `project` is the name of the
   project you copied from.

4. Add the data to the `input` array in `./src/usage/report.ts`.
