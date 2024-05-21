import { makeAutoObservable } from 'mobx'

import { Company, Pagination } from '../../../../models/graphql/schema.ts'

export class CompanyCollectionStore {
  private companyCount: null | number

  private companies: Company[]

  private page: null | number

  private pageSize: null | number

  constructor() {
    this.companyCount = 0
    this.companies = []
    this.page = 0
    this.pageSize = 10
    makeAutoObservable(this)
  }

  public getCompanyCount(): number {
    return this.companyCount ?? 0
  }

  public setCompanyCount(value: number) {
    this.companyCount = value
  }

  public getCompanies(): Company[] {
    return this.companies
  }

  public setCompanies(value: Company[]) {
    this.companies = value
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

const companyCollectionStore = new CompanyCollectionStore()
export default companyCollectionStore
