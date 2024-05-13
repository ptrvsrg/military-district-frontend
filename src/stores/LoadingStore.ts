import { makeAutoObservable } from 'mobx'

export class LoadingStore {
  public loading: boolean

  constructor() {
    this.loading = true
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
