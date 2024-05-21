import { makeAutoObservable } from 'mobx'

import { Division, Pagination } from '../../../../models/graphql/schema.ts'

export class DivisionCollectionStore {
  private divisionCount: null | number

  private divisions: Division[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.divisionCount = 0
    this.divisions = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getDivisionCount(): number {
    return this.divisionCount ?? 0
  }

  public setDivisionCount(value: number) {
    this.divisionCount = value
  }

  public getDivisions(): Division[] {
    return this.divisions
  }

  public setDivisions(value: Division[]) {
    this.divisions = value
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

const divisionCollectionStore = new DivisionCollectionStore()
export default divisionCollectionStore
