import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Squad, SquadInput } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class SquadFormStore {
  private name?: string

  private commander?: MilitaryBrief

  private platoon?: string

  constructor(squad?: Squad) {
    this.name = squad?.name
    this.commander = squad?.commander as MilitaryBrief | undefined
    this.platoon = squad?.platoon?.name
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

  public getPlatoon(): string | undefined {
    return this.platoon
  }

  public setPlatoon(value?: string) {
    this.platoon = value
  }

  public getSquadInput(): SquadInput | undefined {
    const { t } = i18next
    if (!this.name) {
      addAlert(t('nameNotNull'), 'error')
      return undefined
    }

    return {
      commander: this.commander?.mbn,
      name: this.name,
      platoon: this.platoon,
    }
  }
}
