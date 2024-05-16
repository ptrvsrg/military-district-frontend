import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { CoordinateInput, Unit, UnitInput } from '../../../../models/graphql/schema.ts'
import { addAlert } from '../../../../utils/alert.tsx'

export class UnitFormStore {
  private name?: string

  private coordinate?: CoordinateInput

  private country?: string

  private houseNumber?: string

  private locality?: string

  private postCode?: number

  private state?: string

  private street?: string

  private commander?: MilitaryBrief

  private brigades?: string[]

  private corps?: string[]

  private divisions?: string[]

  constructor(unit?: Unit) {
    this.name = unit?.name
    this.coordinate = unit?.coordinate as CoordinateInput | undefined
    this.country = unit?.address?.country ?? undefined
    this.houseNumber = unit?.address?.houseNumber ?? undefined
    this.locality = unit?.address?.locality ?? undefined
    this.postCode = unit?.address?.postCode ?? undefined
    this.state = unit?.address?.state ?? undefined
    this.street = unit?.address?.street ?? undefined
    this.commander = unit?.commander as MilitaryBrief | undefined
    this.brigades = unit?.brigades.map((brigade) => brigade.name) ?? []
    this.corps = unit?.corps.map((corps) => corps.name) ?? []
    this.divisions = unit?.divisions.map((division) => division.name) ?? []
    makeAutoObservable(this)
  }

  public getName(): string | undefined {
    return this.name
  }

  public setName(value?: string) {
    this.name = value
  }

  public getCoordinate(): CoordinateInput | undefined {
    return this.coordinate
  }

  public setCoordinate(value?: CoordinateInput) {
    this.coordinate = value
      ? {
          lat: Math.round(value.lat * 1_000_000) / 1_000_000,
          lng: Math.round(value.lng * 1_000_000) / 1_000_000,
        }
      : undefined
  }

  public getStringCoordinate() {
    if (!this.coordinate) return ''

    const point = this.coordinate
    return `${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}`
  }

  public setCoordinateFromString(pointString: string) {
    const numbers = pointString.replaceAll(/[()]/g, '').split(/,\s*/)
    if (numbers.length !== 2) return
    if (!/^-?\d*\.?\d+$/.test(numbers[0]) || !/^-?\d*\.?\d+$/.test(numbers[1])) return

    const lat = Number.parseFloat(numbers[0])
    const lng = Number.parseFloat(numbers[1])

    this.coordinate = { lat, lng }
  }

  public getCountry(): string | undefined {
    return this.country
  }

  public setCountry(value?: string) {
    this.country = value
  }

  public getState(): string | undefined {
    return this.state
  }

  public setState(value?: string) {
    this.state = value
  }

  public getLocality(): string | undefined {
    return this.locality
  }

  public setLocality(value?: string) {
    this.locality = value
  }

  public getStreet(): string | undefined {
    return this.street
  }

  public setStreet(value?: string) {
    this.street = value
  }

  public getHouseNumber(): string | undefined {
    return this.houseNumber
  }

  public setHouseNumber(value?: string) {
    this.houseNumber = value
  }

  public getPostCode(): number | undefined {
    return this.postCode
  }

  public setPostCode(value?: number) {
    this.postCode = value
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

  public getUnitInput(): UnitInput | undefined {
    const { t } = i18next
    if (!this.name) {
      addAlert(t('nameNotNull'), 'error')
      return undefined
    }

    return {
      address: {
        country: this.country,
        houseNumber: this.houseNumber,
        locality: this.locality,
        postCode: this.postCode,
        state: this.state,
        street: this.street,
      },
      brigades: this.brigades,
      commander: this.commander?.mbn,
      coordinate: this.coordinate
        ? {
            lat: this.coordinate?.lat,
            lng: this.coordinate?.lng,
          }
        : undefined,
      corps: this.corps,
      divisions: this.divisions,
      name: this.name,
    }
  }
}
