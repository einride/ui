type Input = [
  string,
  {
    instances: number
    props: {
      [key: string]: number
    }
  },
]

interface Report {
  name: string
  instances: number
  props: {
    [key: string]: number
  }
}

export function composeReport(input: Array<Input>): Array<Report> {
  const reports = input.map((report) => ({
    name: report[0],
    instances: report[1].instances,
    props: report[1].props,
  }))

  let entries: Array<Report> = []
  reports.forEach((report) => {
    const prevEntry = entries.find((entry) => entry.name === report.name)
    if (prevEntry) {
      const prevInstances = prevEntry?.instances ?? 0
      const currInstances = report.instances
      const nextInstances = prevInstances + currInstances
      const nextEntry = { ...prevEntry, instances: nextInstances }
      const newEntries = [...entries.filter((entry) => entry.name !== report.name), nextEntry]
      entries = newEntries
    } else {
      entries = [...entries, report]
    }
  })

  const sorted = entries.sort((a, b) => a.name.localeCompare(b.name))

  return sorted
}
