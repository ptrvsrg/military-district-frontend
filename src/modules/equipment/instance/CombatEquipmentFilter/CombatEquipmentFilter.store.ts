import { makeAutoObservable } from 'mobx'

import { CombatEquipmentFilter, Sort } from '../../../../models/graphql/schema.ts'

export class CombatEquipmentFilterStore {
  private sortField: null | string

  private sortAsc: boolean | null

  private type: null | string

  private unit: null | string

  constructor() {
    this.sortField = null
    this.sortAsc = null
    this.type = null
    this.unit = null
    makeAutoObservable(this)
  }

  public getSortField(): null | string {
    return this.sortField
  }

  public getSortAsc(): boolean | null {
    return this.sortAsc
  }

  public getType(): null | string {
    return this.type
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

  public setType(value: null | string) {
    this.type = value
  }

  public setUnit(value: null | string) {
    this.unit = value
  }

  public getFilter(): CombatEquipmentFilter | null {
    if (this.type === null && this.unit === null) {
      return null
    }
    return {
      type: this.type,
      unit: this.unit,
    }
  }

  public getSorts(): Sort[] | null {
    if (this.sortField === null || this.sortAsc === null) {
      return [
        {
          field: 'serialNumber',
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

const combatEquipmentFilterStore = new CombatEquipmentFilterStore()
export default combatEquipmentFilterStore
