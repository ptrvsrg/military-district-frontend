import { makeAutoObservable } from 'mobx'

import { CombatEquipment, Pagination } from '../../../../models/graphql/schema.ts'

export class CombatEquipmentCollectionStore {
  private combatEquipmentCount: null | number

  private combatEquipments: CombatEquipment[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.combatEquipmentCount = 0
    this.combatEquipments = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getCombatEquipmentCount(): number {
    return this.combatEquipmentCount ?? 0
  }

  public setCombatEquipmentCount(value: number) {
    this.combatEquipmentCount = value
  }

  public getCombatEquipments(): CombatEquipment[] {
    return this.combatEquipments
  }

  public setCombatEquipments(value: CombatEquipment[]) {
    this.combatEquipments = value
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

const combatEquipmentCollectionStore = new CombatEquipmentCollectionStore()
export default combatEquipmentCollectionStore
