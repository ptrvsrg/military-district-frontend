import { makeAutoObservable } from 'mobx'

import { Military, Pagination } from '../../../models/graphql/schema.ts'

export class MilitaryCollectionStore {
  private militaryCount: null | number

  private militaries: Military[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.militaryCount = 0
    this.militaries = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getMilitaryCount(): number {
    return this.militaryCount ?? 0
  }

  public setMilitaryCount(value: number) {
    this.militaryCount = value
  }

  public getMilitaries(): Military[] {
    return this.militaries
  }

  public setMilitaries(value: Military[]) {
    this.militaries = value
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

const militaryCollectionStore = new MilitaryCollectionStore()
export default militaryCollectionStore
