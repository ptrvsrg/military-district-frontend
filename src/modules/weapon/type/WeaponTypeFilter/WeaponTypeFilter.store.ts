import { makeAutoObservable } from 'mobx'

import { Sort, WeaponTypeFilter } from '../../../../models/graphql/schema.ts'

export class WeaponTypeFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private name: null | string

  private category: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.name = null
    this.category = null
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

  public getCategory(): null | string {
    return this.category
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

  public setCategory(value: null | string) {
    this.category = value
  }

  public getFilter(): WeaponTypeFilter | null {
    if (this.name === null && this.category === null) {
      return null
    }
    return {
      category: this.category,
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
        {
          field: 'category.name',
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

const weaponTypeFilterStore = new WeaponTypeFilterStore()
export default weaponTypeFilterStore
