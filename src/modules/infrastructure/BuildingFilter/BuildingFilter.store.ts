import { makeAutoObservable } from 'mobx'

import { BuildingFilter, Sort } from '../../../models/graphql/schema.ts'

export class BuildingFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private name: null | string

  private address: null | string

  private unit: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.name = null
    this.address = null
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

  public getAddress(): null | string {
    return this.address
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

  public setAddress(value: null | string) {
    this.address = value
  }

  public setUnit(value: null | string) {
    this.unit = value
  }

  public getFilter(): BuildingFilter | null {
    if (this.name === null && this.address === null && this.unit === null) {
      return null
    }
    return {
      address: this.address,
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
        {
          field: 'unit.name',
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

const buildingFilterStore = new BuildingFilterStore()
export default buildingFilterStore
