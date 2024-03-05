export const isInArray = <T, U extends T>(item: T, array: ReadonlyArray<U>): item is U => {
  return array.includes(item as U)
}
