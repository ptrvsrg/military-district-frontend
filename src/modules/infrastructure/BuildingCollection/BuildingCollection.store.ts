import { makeAutoObservable } from 'mobx'

import { Building, Pagination } from '../../../models/graphql/schema.ts'

export class BuildingCollectionStore {
  private buildingCount: null | number

  private buildings: Building[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.buildingCount = 0
    this.buildings = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getBuildingCount(): number {
    return this.buildingCount ?? 0
  }

  public setBuildingCount(value: number) {
    this.buildingCount = value
  }

  public getBuildings(): Building[] {
    return this.buildings
  }

  public setBuildings(value: Building[]) {
    this.buildings = value
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

const buildingCollectionStore = new BuildingCollectionStore()
export default buildingCollectionStore
