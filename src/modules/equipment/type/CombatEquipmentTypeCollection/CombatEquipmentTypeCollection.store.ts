import { makeAutoObservable } from 'mobx'

import { CombatEquipmentType, Pagination } from '../../../../models/graphql/schema.ts'

export class CombatEquipmentTypeCollectionStore {
  private combatEquipmentTypeCount: null | number

  private combatEquipmentTypes: CombatEquipmentType[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.combatEquipmentTypeCount = 0
    this.combatEquipmentTypes = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getCombatEquipmentTypeCount(): number {
    return this.combatEquipmentTypeCount ?? 0
  }

  public setCombatEquipmentTypeCount(value: number) {
    this.combatEquipmentTypeCount = value
  }

  public getCombatEquipmentTypes(): CombatEquipmentType[] {
    return this.combatEquipmentTypes
  }

  public setCombatEquipmentTypes(value: CombatEquipmentType[]) {
    this.combatEquipmentTypes = value
  }

  public getPage(): number {
    return this.page ?? 0
  }

  public setPage(value: number) {
    this.page = value
  }

  public getPageSize(): number {
    return this.pageSize ?? 10
  }

  public setPageSize(value: number) {
    this.pageSize = value
  }

  public getPagination(): Pagination | null {
    if (this.page === null || this.pageSize === null) {
      return null
    }
    return {
      page: this.page,
      pageSize: this.pageSize,
    }
  }
}

const combatEquipmentTypeCollectionStore = new CombatEquipmentTypeCollectionStore()
export default combatEquipmentTypeCollectionStore
