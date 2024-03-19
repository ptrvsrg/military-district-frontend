import { makeAutoObservable } from 'mobx'

import { OptionType } from '../../components/select/Select.types.ts'

export interface Attribute {
  option: OptionType
  value: string
}

export class CreatableSelectStore {
  attributes: Attribute[]

  constructor() {
    this.attributes = []
    makeAutoObservable(this)
  }

  addAttribute(attribute: Attribute) {
    // eslint-disable-next-line no-restricted-syntax
    for (const a of this.attributes) {
      if (a.option.value === attribute.option.value && a.value === attribute.value) return
    }
    this.attributes.push(attribute)
  }

  removeAttribute(attribute: Attribute) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, a] of this.attributes.entries()) {
      if (a.option.value === attribute.option.value && a.value === attribute.value) {
        this.attributes.splice(index, 1)
      }
    }
  }

  getAttributes(): Attribute[] {
    return this.attributes
  }
}
