import { makeAutoObservable } from 'mobx'

import { MilitaryFilter, Sort } from '../../../models/graphql/schema.ts'

export class MilitaryFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private name: null | string

  private rank: null | string

  private unit: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.name = null
    this.rank = null
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

  public getRank(): null | string {
    return this.rank
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

  public setRank(value: null | string) {
    this.rank = value
  }

  public setUnit(value: null | string) {
    this.unit = value
  }

  public getFilter(): MilitaryFilter | null {
    if (this.name === null && this.rank === null && this.unit === null) {
      return null
    }
    return {
      name: this.name,
      rank: this.rank,
      unit: this.unit,
    }
  }

  public getSorts(): Sort[] | null {
    if (this.sortField === null || this.sortAsc === null) {
      return [
        {
          field: 'mbn',
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

const militaryFilterStore = new MilitaryFilterStore()
export default militaryFilterStore
