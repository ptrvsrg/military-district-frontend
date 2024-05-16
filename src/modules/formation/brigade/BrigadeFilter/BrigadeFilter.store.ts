import { makeAutoObservable } from 'mobx'

import { BrigadeFilter, Sort } from '../../../../models/graphql/schema.ts'

export class BrigadeFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private name: null | string

  private commander: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.name = null
    this.commander = null
    makeAutoObservable(this)
  }

  public getSortField(): null | string {
    return this.sortField
  }

  public getSortAsc(): boolean | null {
    return this.sortAsc
  }

  public getName(): null | string {
    return this.name
  }

  public getCommander(): null | string {
    return this.commander
  }

  public setSortField(value: null | string) {
    this.sortField = value
  }

  public setSortAsc(value: boolean | null) {
    this.sortAsc = value
  }

  public setName(value: null | string) {
    this.name = value
  }

  public setCommander(value: null | string) {
    this.commander = value
  }

  public getFilter(): BrigadeFilter | null {
    if (this.name === null && this.commander === null) {
      return null
    }
    return {
      commander: this.commander,
      name: this.name,
    }
  }

  public getSorts(): Sort[] | null {
    if (this.sortField === null || this.sortAsc === null) {
      return null
    }
    return [
      {
        field: this.sortField,
        sortAsc: this.sortAsc,
      },
    ]
  }
}

const brigadeFilterStore = new BrigadeFilterStore()
export default brigadeFilterStore
