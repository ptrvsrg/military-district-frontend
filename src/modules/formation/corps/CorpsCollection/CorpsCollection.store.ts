import { makeAutoObservable } from 'mobx'

import { Corps, Pagination } from '../../../../models/graphql/schema.ts'

export class CorpsCollectionStore {
  private corpsCount: null | number

  private corps: Corps[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.corpsCount = 0
    this.corps = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getCorpsCount(): number {
    return this.corpsCount ?? 0
  }

  public setCorpsCount(value: number) {
    this.corpsCount = value
  }

  public getCorps(): Corps[] {
    return this.corps
  }

  public setCorps(value: Corps[]) {
    this.corps = value
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

const corpsCollectionStore = new CorpsCollectionStore()
export default corpsCollectionStore
