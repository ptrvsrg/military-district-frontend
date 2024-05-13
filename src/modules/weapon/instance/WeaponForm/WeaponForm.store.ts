import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { Weapon, WeaponInput, WeaponType } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class WeaponFormStore {
  private serialNumber?: string

  private unit?: string

  private type?: WeaponType

  constructor(weapon?: Weapon) {
    this.serialNumber = weapon?.serialNumber
    this.unit = weapon?.unit?.name
    this.type = weapon?.type ?? undefined
    makeAutoObservable(this)
  }

  public getSerialNumber(): string | undefined {
    return this.serialNumber
  }

  public setSerialNumber(value?: string) {
    this.serialNumber = value
  }

  public getUnit(): string | undefined {
    return this.unit
  }

  public setUnit(value?: string) {
    this.unit = value
  }

  public getType(): WeaponType | undefined {
    return this.type
  }

  public setType(value?: WeaponType) {
    this.type = value
  }

  public getWeaponInput(): WeaponInput | undefined {
    const { t } = i18next
    if (!this.serialNumber) {
      addAlert(t('serialNumberNotNull'), 'error')
      return undefined
    }

    return {
      serialNumber: this.serialNumber,
      type: this.type?.name,
      unit: this.unit,
    }
  }
}
