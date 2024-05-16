import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { AttributeInput, CombatEquipmentCategory, CombatEquipmentType, CombatEquipmentTypeInput } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class CombatEquipmentTypeFormStore {
  private name?: string

  private category?: CombatEquipmentCategory

  private attributes: AttributeInput[]

  constructor(combatEquipmentType?: CombatEquipmentType) {
    this.name = combatEquipmentType?.name
    this.category = combatEquipmentType?.category
    this.attributes =
      combatEquipmentType?.attributes?.map((attribute) => {
        return {
          name: attribute.name,
          value: attribute.value,
        } as AttributeInput
      }) ?? []
    makeAutoObservable(this)
  }

  public getAttributes(): AttributeInput[] {
    return this.attributes
  }

  public setAttributes(value: AttributeInput[]) {
    this.attributes = value
  }

  public addAttribute(name?: string, value?: string) {
    const { t } = i18next
    if (!name) {
      addAlert(t('attributeNameNotNull'), 'error')
      return
    }
    if (!value) {
      addAlert(t('attributeValueNotNull'), 'error')
      return
    }

    this.attributes = [
      {
        name,
        value,
      },
      ...(this.attributes?.filter((attribute) => attribute.name !== name) ?? []),
    ]
  }

  public deleteAttribute(name: string) {
    this.attributes = this.attributes?.filter((attribute) => attribute.name !== name)
  }

  public getName(): string | undefined {
    return this.name
  }

  public setName(value?: string) {
    this.name = value
  }

  public getCategory(): CombatEquipmentCategory | undefined {
    return this.category
  }

  public setCategory(value?: CombatEquipmentCategory) {
    this.category = value
  }

  public getCombatEquipmentTypeInput(): CombatEquipmentTypeInput | undefined {
    const { t } = i18next
    if (!this.name) {
      addAlert(t('nameNotNull'), 'error')
      return undefined
    }
    if (!this.category) {
      addAlert(t('categoryNotNull'), 'error')
      return undefined
    }

    return {
      attributes: this.attributes,
      category: this.category?.name,
      name: this.name,
    }
  }
}
