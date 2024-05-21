import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Army, ArmyInput } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class ArmyFormStore {
  private name?: string

  private commander?: MilitaryBrief

  private brigades?: string[]

  private corps?: string[]

  private divisions?: string[]

  constructor(army?: Army) {
    this.name = army?.name
    this.commander = army?.commander as MilitaryBrief | undefined
    this.brigades = army?.brigades.map((brigade) => brigade.name) ?? []
    this.corps = army?.corps.map((corps) => corps.name) ?? []
    this.divisions = army?.divisions.map((division) => division.name) ?? []
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

  public getBrigades(): string[] | undefined {
    return this.brigades
  }

  public setBrigades(value?: string[]) {
    this.brigades = value
  }

  public getCorps(): string[] | undefined {
    return this.corps
  }

  public setCorps(value?: string[]) {
    this.corps = value
  }

  public getDivisions(): string[] | undefined {
    return this.divisions
  }

  public setDivisions(value?: string[]) {
    this.divisions = value
  }

  public getArmyInput(): ArmyInput | undefined {
    const { t } = i18next
    if (!this.name) {
      addAlert(t('nameNotNull'), 'error')
      return undefined
    }

    return {
      brigades: this.brigades,
      commander: this.commander?.mbn,
      corps: this.corps,
      divisions: this.divisions,
      name: this.name,
    }
  }
}
