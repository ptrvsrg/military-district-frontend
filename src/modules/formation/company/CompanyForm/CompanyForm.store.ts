import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Company, CompanyInput } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class CompanyFormStore {
  private name?: string

  private commander?: MilitaryBrief

  private unit?: string

  constructor(company?: Company) {
    this.name = company?.name
    this.commander = company?.commander as MilitaryBrief | undefined
    this.unit = company?.unit?.name
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

  public getUnit(): string | undefined {
    return this.unit
  }

  public setUnit(value?: string) {
    this.unit = value
  }

  public getCompanyInput(): CompanyInput | undefined {
    const { t } = i18next
    if (!this.name) {
      addAlert(t('nameNotNull'), 'error')
      return undefined
    }

    return {
      commander: this.commander?.mbn,
      name: this.name,
      unit: this.unit,
    }
  }
}
