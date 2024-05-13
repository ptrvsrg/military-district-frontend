import { makeAutoObservable } from 'mobx'

import { Army, Pagination } from '../../../../models/graphql/schema.ts'

export class ArmyCollectionStore {
  private armyCount: null | number

  private armies: Army[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.armyCount = 0
    this.armies = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getArmyCount(): number {
    return this.armyCount ?? 0
  }

  public setArmyCount(value: number) {
    this.armyCount = value
  }

  public getArmies(): Army[] {
    return this.armies
  }

  public setArmies(value: Army[]) {
    this.armies = value
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

const armyCollectionStore = new ArmyCollectionStore()
export default armyCollectionStore
