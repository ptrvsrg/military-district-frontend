import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'

import { AttributeInput, Building, BuildingInput, CoordinateInput } from '../../../models/graphql/schema.ts'
import { addAlert } from '../../../utils/alert.tsx'

export class BuildingFormStore {
  private name?: string

  private unit?: string

  private coordinate?: CoordinateInput

  private country?: string

  private houseNumber?: string

  private locality?: string

  private postCode?: number

  private state?: string

  private street?: string

  private companies?: string[]

  private platoons?: string[]

  private squads?: string[]

  private attributes: AttributeInput[]

  constructor(building?: Building) {
    this.name = building?.name
    this.unit = building?.unit?.name
    this.coordinate = building?.coordinate as CoordinateInput | undefined
    this.country = building?.address?.country ?? undefined
    this.houseNumber = building?.address?.houseNumber ?? undefined
    this.locality = building?.address?.locality ?? undefined
    this.postCode = building?.address?.postCode ?? undefined
    this.state = building?.address?.state ?? undefined
    this.street = building?.address?.street ?? undefined
    this.companies = building?.companies.map((company) => company.name) ?? []
    this.platoons = building?.platoons.map((platoon) => platoon.name) ?? []
    this.squads = building?.squads.map((squad) => squad.name) ?? []
    this.attributes =
      building?.attributes.map((attribute) => {
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

  public getUnit(): string | undefined {
    return this.unit
  }

  public setUnit(value?: string) {
    this.unit = value
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

  public getCompanies(): string[] | undefined {
    return this.companies
  }

  public setCompanies(value?: string[]) {
    this.companies = value
  }

  public getPlatoons(): string[] | undefined {
    return this.platoons
  }

  public setPlatoons(value?: string[]) {
    this.platoons = value
  }

  public getSquads(): string[] | undefined {
    return this.squads
  }

  public setSquads(value?: string[]) {
    this.squads = value
  }

  public getBuildingInput(): BuildingInput | undefined {
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
      companies: this.companies,
      coordinate: this.coordinate
        ? {
            lat: this.coordinate?.lat,
            lng: this.coordinate?.lng,
          }
        : undefined,
      name: this.name,
      platoons: this.platoons,
      squads: this.squads,
      unit: this.unit,
    }
  }
}
