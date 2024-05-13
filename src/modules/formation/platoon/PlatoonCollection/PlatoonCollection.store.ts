import { makeAutoObservable } from 'mobx'

import { Pagination, Platoon } from '../../../../models/graphql/schema.ts'

export class PlatoonCollectionStore {
  private platoonCount: null | number

  private platoons: Platoon[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.platoonCount = 0
    this.platoons = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getPlatoonCount(): number {
    return this.platoonCount ?? 0
  }

  public setPlatoonCount(value: number) {
    this.platoonCount = value
  }

  public getPlatoons(): Platoon[] {
    return this.platoons
  }

  public setPlatoons(value: Platoon[]) {
    this.platoons = value
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

const platoonCollectionStore = new PlatoonCollectionStore()
export default platoonCollectionStore
