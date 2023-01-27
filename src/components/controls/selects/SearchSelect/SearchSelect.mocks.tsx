import { faker } from "@faker-js/faker"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { BaseOption } from "./types"

const contents = [
  "Snowfall guzzler drapery",
  "Remorse strike tartly",
  "Operator dazzling breeding",
  "Egestas Lorem Ullamcorper",
  "Ornare Egestas Ridiculus",
  "Ridiculus Elit Inceptos",
]

export const getMockData = (count: number, withInputValue?: boolean): BaseOption[] => {
  return [...Array(count)].map((_, index) => {
    const content = contents[index] ?? faker.random.words(4)
    return {
      label: <Paragraph>{content}</Paragraph>,
      value: withInputValue ? faker.datatype.uuid() : content,
      ...(withInputValue ? { inputValue: content } : {}),
    }
  })
}
