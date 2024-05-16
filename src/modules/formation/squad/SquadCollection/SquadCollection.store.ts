import { makeAutoObservable } from 'mobx'

import { Pagination, Squad } from '../../../../models/graphql/schema.ts'

export class SquadCollectionStore {
  private squadCount: null | number

  private squads: Squad[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.squadCount = 0
    this.squads = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getSquadCount(): number {
    return this.squadCount ?? 0
  }

  public setSquadCount(value: number) {
    this.squadCount = value
  }

  public getSquads(): Squad[] {
    return this.squads
  }

  public setSquads(value: Squad[]) {
    this.squads = value
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

const squadCollectionStore = new SquadCollectionStore()
export default squadCollectionStore
