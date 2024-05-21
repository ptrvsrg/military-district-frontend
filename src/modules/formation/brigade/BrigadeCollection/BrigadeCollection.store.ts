import { makeAutoObservable } from 'mobx'

import { Brigade, Pagination } from '../../../../models/graphql/schema.ts'

export class BrigadeCollectionStore {
  private brigadeCount: null | number

  private brigades: Brigade[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.brigadeCount = 0
    this.brigades = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getBrigadeCount(): number {
    return this.brigadeCount ?? 0
  }

  public setBrigadeCount(value: number) {
    this.brigadeCount = value
  }

  public getBrigades(): Brigade[] {
    return this.brigades
  }

  public setBrigades(value: Brigade[]) {
    this.brigades = value
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

const brigadeCollectionStore = new BrigadeCollectionStore()
export default brigadeCollectionStore
