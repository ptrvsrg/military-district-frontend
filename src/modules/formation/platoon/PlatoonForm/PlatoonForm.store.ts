import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Platoon, PlatoonInput } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class PlatoonFormStore {
  private name?: string

  private commander?: MilitaryBrief

  private company?: string

  constructor(platoon?: Platoon) {
    this.name = platoon?.name
    this.commander = platoon?.commander as MilitaryBrief | undefined
    this.company = platoon?.company?.name
    makeAutoObservable(this)
  }

  public getName(): string | undefined {
    return this.name
  }

  public setName(value?: string) {
    this.name = value
  }

  public getCommander(): MilitaryBrief | undefined {
    return this.commander
  }

  public setCommander(value?: MilitaryBrief) {
    this.commander = value
  }

  public getCompany(): string | undefined {
    return this.company
  }

  public setCompany(value?: string) {
    this.company = value
  }

  public getPlatoonInput(): PlatoonInput | undefined {
    const { t } = i18next
    if (!this.name) {
      addAlert(t('nameNotNull'), 'error')
      return undefined
    }

    return {
      commander: this.commander?.mbn,
      company: this.company,
      name: this.name,
    }
  }
}
