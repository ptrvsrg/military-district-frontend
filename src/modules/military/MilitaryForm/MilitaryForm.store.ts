import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { Military, MilitaryAttributeInput, MilitaryInput, Rank, Specialty } from '../../../models/graphql/schema.ts'
import { addAlert } from '../../../utils/alert.tsx'

export class MilitaryFormStore {
  private mbn?: string

  private firstName?: string

  private lastName?: string

  private middleName?: string

  private birthDate?: string

  private rank?: Rank

  private unit?: string

  private specialties: Specialty[]

  private attributes: MilitaryAttributeInput[]

  constructor(military?: Military) {
    this.mbn = military?.mbn
    this.birthDate = military?.birthDate
    this.firstName = military?.firstName
    this.lastName = military?.lastName
    this.middleName = military?.middleName ?? undefined
    this.rank = military?.rank ?? undefined
    this.specialties = military?.specialties ?? []
    this.unit = military?.unit?.name
    this.attributes =
      military?.attributes.map((attribute) => {
        return {
          name: attribute.name,
          rank: attribute.rank.name,
          value: attribute.value,
        } as MilitaryAttributeInput
      }) ?? []
    makeAutoObservable(this)
  }

  public getAttributes(): MilitaryAttributeInput[] {
    return this.attributes
  }

  public setAttributes(value: MilitaryAttributeInput[]) {
    this.attributes = value
  }

  public addAttribute(rank?: Rank, name?: string, value?: string) {
    const { t } = i18next
    if (!rank) {
      addAlert(t('attributeRankNotNull'), 'error')
      return
    }
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
        rank: rank.name,
        value,
      },
      ...(this.attributes?.filter((attribute) => attribute.rank !== rank.name || attribute.name !== name) ?? []),
    ]
  }

  public deleteAttribute(rank: string, name: string) {
    this.attributes = this.attributes?.filter((attribute) => attribute.rank !== rank || attribute.name !== name)
  }

  public getBirthDate(): string | undefined {
    return this.birthDate
  }

  public setBirthDate(value?: string) {
    this.birthDate = value
  }

  public getFirstName(): string | undefined {
    return this.firstName
  }

  public setFirstName(value: string | undefined) {
    this.firstName = value === '' ? undefined : value
  }

  public getLastName(): string | undefined {
    return this.lastName
  }

  public setLastName(value: string | undefined) {
    this.lastName = value === '' ? undefined : value
  }

  public getMbn(): string | undefined {
    return this.mbn
  }

  public setMbn(value: string | undefined) {
    this.mbn = value === '' ? undefined : value
  }

  public getMiddleName(): string | undefined {
    return this.middleName
  }

  public setMiddleName(value: string | undefined) {
    this.middleName = value === '' ? undefined : value
  }

  public getRank(): Rank | undefined {
    return this.rank
  }

  public setRank(value: Rank | undefined) {
    this.rank = value
  }

  public getSpecialties(): Specialty[] {
    return this.specialties ?? []
  }

  public setSpecialties(value: Specialty[]) {
    this.specialties = value
  }

  public getUnit(): string | undefined {
    return this.unit
  }

  public setUnit(value: string | undefined) {
    this.unit = value === '' ? undefined : value
  }

  public getMilitaryInput(): MilitaryInput | null {
    const { t } = i18next
    if (!this.mbn) {
      addAlert(t('mbnNotNull'), 'error')
      return null
    }
    if (!this.lastName) {
      addAlert(t('lastNameNotNull'), 'error')
      return null
    }
    if (!this.firstName) {
      addAlert(t('firstNameNotNull'), 'error')
      return null
    }
    if (!this.birthDate) {
      addAlert(t('birthDateNotNull'), 'error')
      return null
    }

    return {
      attributes: this.attributes,
      birthDate: this.birthDate,
      firstName: this.firstName,
      lastName: this.lastName,
      mbn: this.mbn,
      middleName: this.middleName,
      rank: this.rank?.name,
      specialties: this.specialties?.filter((specialty) => specialty && specialty.code).map((specialty) => specialty.code),
      unit: this.unit,
    }
  }
}
