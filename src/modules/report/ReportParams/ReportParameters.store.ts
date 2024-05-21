import { makeAutoObservable } from 'mobx'

export class ReportParametersStore {
  private parameters: Record<string, null | string>

  constructor() {
    this.parameters = {}
    makeAutoObservable(this)
  }

  public getParameter(parameter: string): null | string {
    return this.parameters[parameter]
  }

  public setParameter(parameter: string, value: null | string) {
    this.parameters[parameter] = value
  }
}
