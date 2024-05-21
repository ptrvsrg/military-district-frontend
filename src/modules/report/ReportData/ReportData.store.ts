import { makeAutoObservable } from 'mobx'

export class ReportDataStore {
  private reportData: Record<string, string>[] | undefined

  constructor() {
    this.reportData = undefined
    makeAutoObservable(this)
  }

  public getReportData(): Record<string, string>[] | undefined {
    return this.reportData
  }

  public setReportData(value?: Record<string, string>[]) {
    this.reportData = value
  }
}
