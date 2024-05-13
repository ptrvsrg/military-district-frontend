import { makeAutoObservable } from 'mobx'

import { Pagination, Unit } from '../../../../models/graphql/schema.ts'

export class UnitCollectionStore {
  private unitCount: null | number

  private units: Unit[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.unitCount = 0
    this.units = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getUnitCount(): number {
    return this.unitCount ?? 0
  }

  public setUnitCount(value: number) {
    this.unitCount = value
  }

  public getUnits(): Unit[] {
    return this.units
  }

  public setUnits(value: Unit[]) {
    this.units = value
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

const unitCollectionStore = new UnitCollectionStore()
export default unitCollectionStore
