import { makeAutoObservable } from 'mobx'

import { PlatoonFilter, Sort } from '../../../../models/graphql/schema.ts'

export class PlatoonFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private name: null | string

  private commander: null | string

  private company: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.name = null
    this.commander = null
    this.company = null
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

  public getCompany(): null | string {
    return this.company
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

  public setCompany(value: null | string) {
    this.company = value
  }

  public getFilter(): PlatoonFilter | null {
    if (this.name === null && this.commander === null) {
      return null
    }
    return {
      commander: this.commander,
      company: this.company,
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

const platoonFilterStore = new PlatoonFilterStore()
export default platoonFilterStore
