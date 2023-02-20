import { composeReport } from "./composeReport"
import book from "./reports/book.json"
import deliver from "./reports/deliver.json"
import evolve from "./reports/evolve.json"
import explore from "./reports/explore.json"
import extend from "./reports/extend.json"
import orchestrate from "./reports/orchestrate.json"
import sagaAdmin from "./reports/saga-admin.json"
import sagaCore from "./reports/saga-core.json"
import sagaDashboard from "./reports/saga-dashboard.json"
import website from "./reports/website.json"

const input = [
  ...Object.entries(book),
  ...Object.entries(deliver),
  ...Object.entries(evolve),
  ...Object.entries(explore),
  ...Object.entries(extend),
  ...Object.entries(orchestrate),
  ...Object.entries(sagaAdmin),
  ...Object.entries(sagaCore),
  ...Object.entries(sagaDashboard),
  ...Object.entries(website),
]

export const report = composeReport(input)
