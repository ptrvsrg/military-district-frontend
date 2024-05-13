import { makeAutoObservable } from 'mobx'

import { Pagination, WeaponType } from '../../../../models/graphql/schema.ts'

export class WeaponTypeCollectionStore {
  private weaponTypeCount: null | number

  private weaponTypes: WeaponType[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.weaponTypeCount = 0
    this.weaponTypes = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getWeaponTypeCount(): number {
    return this.weaponTypeCount ?? 0
  }

  public setWeaponTypeCount(value: number) {
    this.weaponTypeCount = value
  }

  public getWeaponTypes(): WeaponType[] {
    return this.weaponTypes
  }

  public setWeaponTypes(value: WeaponType[]) {
    this.weaponTypes = value
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

const weaponTypeCollectionStore = new WeaponTypeCollectionStore()
export default weaponTypeCollectionStore
