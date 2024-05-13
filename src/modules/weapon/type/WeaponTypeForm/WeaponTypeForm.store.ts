import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { AttributeInput, WeaponCategory, WeaponType, WeaponTypeInput } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class WeaponTypeFormStore {
  private name?: string

  private category?: WeaponCategory

  private attributes: AttributeInput[]

  constructor(weaponType?: WeaponType) {
    this.name = weaponType?.name
    this.category = weaponType?.category
    this.attributes =
      weaponType?.attributes?.map((attribute) => {
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

  public getCategory(): WeaponCategory | undefined {
    return this.category
  }

  public setCategory(value?: WeaponCategory) {
    this.category = value
  }

  public getWeaponTypeInput(): WeaponTypeInput | undefined {
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
