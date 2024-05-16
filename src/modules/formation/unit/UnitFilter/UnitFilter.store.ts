import { makeAutoObservable } from 'mobx'

import { Sort, UnitFilter } from '../../../../models/graphql/schema.ts'

export class UnitFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private name: null | string

  private commander: null | string

  private address: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.name = null
    this.commander = null
    this.address = null
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

  public getAddress(): null | string {
    return this.address
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

  public setAddress(value: null | string) {
    this.address = value
  }

  public getFilter(): UnitFilter | null {
    if (this.name === null && this.commander === null && this.address === null) {
      return null
    }
    return {
      address: this.address,
      commander: this.commander,
      name: this.name,
    }
  }

  public getSorts(): Sort[] | null {
    if (this.sortField === null || this.sortAsc === null) {
      return [
        {
          field: 'name',
          sortAsc: true,
        },
      ]
    }
    return [
      {
        field: this.sortField,
        sortAsc: this.sortAsc,
      },
    ]
  }
}

const unitFilterStore = new UnitFilterStore()
export default unitFilterStore
