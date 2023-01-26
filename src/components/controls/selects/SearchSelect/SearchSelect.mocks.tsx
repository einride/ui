import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { BaseOption } from "./types"

const contents = [
  "Snowfall guzzler drapery",
  "Remorse strike tartly",
  "Operator dazzling breeding",
  "Egestas Lorem Ullamcorper",
  "Ornare Egestas Ridiculus",
  "Ridiculus Elit Inceptos",
  "Donec id elit non mi",
  "porta gravida at eget metus",
  "Maecenas sed diam eget",
  "risus varius blandit",
  "sit amet non magna",
  "Curabitur blandit tempus porttitor",
  "Duis mollis, est non commodo luctus",
  "nisi erat porttitor",
  "ligula eget lacinia",
  "odio sem nec elit",
  "Nullam quis risus",
  "eget urna mollis",
  "ornare vel eu leo",
]

export const getMockData = (count: number, withInputValue = true): BaseOption[] => {
  return [...Array(count)].map((_, index) => {
    const content = contents[index % contents.length]
    return {
      label: <Paragraph>{content}</Paragraph>,
      value: `${content.toLowerCase().replace(/\s/g, "-")}_${index}`,
      ...(withInputValue ? { inputValue: content } : {}),
    }
  })
}
