import { makeAutoObservable } from 'mobx'

import { CompanyFilter, Sort } from '../../../../models/graphql/schema.ts'

export class CompanyFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private name: null | string

  private commander: null | string

  private unit: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.name = null
    this.commander = null
    this.unit = null
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

  public getUnit(): null | string {
    return this.unit
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

  public setUnit(value: null | string) {
    this.unit = value
  }

  public getFilter(): CompanyFilter | null {
    if (this.name === null && this.commander === null) {
      return null
    }
    return {
      commander: this.commander,
      name: this.name,
      unit: this.unit,
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

const companyFilterStore = new CompanyFilterStore()
export default companyFilterStore
