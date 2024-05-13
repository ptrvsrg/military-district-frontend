import { makeAutoObservable } from 'mobx'

import { Pagination, Weapon } from '../../../../models/graphql/schema.ts'

export class WeaponCollectionStore {
  private weaponCount: null | number

  private weapons: Weapon[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.weaponCount = 0
    this.weapons = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getWeaponCount(): number {
    return this.weaponCount ?? 0
  }

  public setWeaponCount(value: number) {
    this.weaponCount = value
  }

  public getWeapons(): Weapon[] {
    return this.weapons
  }

  public setWeapons(value: Weapon[]) {
    this.weapons = value
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

const weaponCollectionStore = new WeaponCollectionStore()
export default weaponCollectionStore
