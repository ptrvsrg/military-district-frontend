import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { CombatEquipment, CombatEquipmentInput, CombatEquipmentType } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class CombatEquipmentFormStore {
  private serialNumber?: string

  private unit?: string

  private type?: CombatEquipmentType

  constructor(combatEquipment?: CombatEquipment) {
    this.serialNumber = combatEquipment?.serialNumber
    this.unit = combatEquipment?.unit?.name
    this.type = combatEquipment?.type ?? undefined
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

  public getType(): CombatEquipmentType | undefined {
    return this.type
  }

  public setType(value?: CombatEquipmentType) {
    this.type = value
  }

  public getCombatEquipmentInput(): CombatEquipmentInput | undefined {
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
