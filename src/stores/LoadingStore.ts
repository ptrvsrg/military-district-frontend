import { makeAutoObservable } from 'mobx'

export class LoadingStore {
  private loading: boolean

  constructor() {
    this.loading = false
    makeAutoObservable(this)
  }

  public getLoading(): boolean {
    return this.loading
  }

  public setLoading(value: boolean) {
    this.loading = value
  }
}

const loadingStore = new LoadingStore()
export default loadingStore
