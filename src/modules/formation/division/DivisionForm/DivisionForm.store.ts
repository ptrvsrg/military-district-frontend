import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Division, DivisionInput } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class DivisionFormStore {
  private name?: string

  private commander?: MilitaryBrief

  private units?: string[]

  private armies?: string[]

  constructor(division?: Division) {
    this.name = division?.name
    this.commander = division?.commander as MilitaryBrief | undefined
    this.units = division?.units.map((unit) => unit.name) ?? []
    this.armies = division?.armies.map((army) => army.name) ?? []
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

  public getUnits(): string[] | undefined {
    return this.units
  }

  public setUnits(value?: string[]) {
    this.units = value
  }

  public getArmies(): string[] | undefined {
    return this.armies
  }

  public setArmies(value?: string[]) {
    this.armies = value
  }

  public getDivisionInput(): DivisionInput | undefined {
    const { t } = i18next
    if (!this.name) {
      addAlert(t('nameNotNull'), 'error')
      return undefined
    }

    return {
      armies: this.armies,
      commander: this.commander?.mbn,
      name: this.name,
      units: this.units,
    }
  }
}
