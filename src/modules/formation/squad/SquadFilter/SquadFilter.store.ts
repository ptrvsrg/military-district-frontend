import { makeAutoObservable } from 'mobx'

import { Sort, SquadFilter } from '../../../../models/graphql/schema.ts'

export class SquadFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private name: null | string

  private commander: null | string

  private platoon: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.name = null
    this.commander = null
    this.platoon = null
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

  public getPlatoon(): null | string {
    return this.platoon
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

  public setPlatoon(value: null | string) {
    this.platoon = value
  }

  public getFilter(): SquadFilter | null {
    if (this.name === null && this.commander === null) {
      return null
    }
    return {
      commander: this.commander,
      name: this.name,
      platoon: this.platoon,
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

const squadFilterStore = new SquadFilterStore()
export default squadFilterStore
