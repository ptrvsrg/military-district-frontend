// eslint-disable-next-line unicorn/no-abusive-eslint-disable
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = { [SubKey in K]?: Maybe<T[SubKey]> } & Omit<T, K>
export type MakeMaybe<T, K extends keyof T> = { [SubKey in K]: Maybe<T[SubKey]> } & Omit<T, K>
export type MakeEmpty<
  T extends {
    [key: string]: unknown
  },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> = { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never } | T
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Boolean: { input: boolean; output: boolean }
  Date: { input: any; output: any }
  Float: { input: number; output: number }
  ID: { input: string; output: string }
  Int: { input: number; output: number }
  String: { input: string; output: string }
}

export type Address = {
  __typename?: 'Address'
  country?: Maybe<Scalars['String']['output']>
  houseNumber?: Maybe<Scalars['String']['output']>
  locality?: Maybe<Scalars['String']['output']>
  postCode?: Maybe<Scalars['Int']['output']>
  state?: Maybe<Scalars['String']['output']>
  street?: Maybe<Scalars['String']['output']>
}

export type AddressInput = {
  country?: InputMaybe<Scalars['String']['input']>
  houseNumber?: InputMaybe<Scalars['String']['input']>
  locality?: InputMaybe<Scalars['String']['input']>
  postCode?: InputMaybe<Scalars['Int']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  street?: InputMaybe<Scalars['String']['input']>
}

export type Army = {
  __typename?: 'Army'
  brigades: Array<Brigade>
  commander?: Maybe<Military>
  corps: Array<Corps>
  divisions: Array<Division>
  name: Scalars['String']['output']
}

export type ArmyFilter = {
  commander?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type ArmyInput = {
  brigades?: InputMaybe<Array<Scalars['String']['input']>>
  commander?: InputMaybe<Scalars['String']['input']>
  corps?: InputMaybe<Array<Scalars['String']['input']>>
  divisions?: InputMaybe<Array<Scalars['String']['input']>>
  name: Scalars['String']['input']
}

export type Attribute = {
  __typename?: 'Attribute'
  name: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type AttributeInput = {
  name: Scalars['String']['input']
  value: Scalars['String']['input']
}

export type Brigade = {
  __typename?: 'Brigade'
  armies: Array<Army>
  commander?: Maybe<Military>
  name: Scalars['String']['output']
  units: Array<Unit>
}

export type BrigadeFilter = {
  commander?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type BrigadeInput = {
  armies?: InputMaybe<Array<Scalars['String']['input']>>
  commander?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  units?: InputMaybe<Array<Scalars['String']['input']>>
}

export type Building = {
  __typename?: 'Building'
  address?: Maybe<Address>
  attributes: Array<Attribute>
  companies: Array<Company>
  coordinate?: Maybe<Coordinate>
  name: Scalars['String']['output']
  platoons: Array<Platoon>
  squads: Array<Squad>
  unit?: Maybe<Unit>
}

export type BuildingFilter = {
  address?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type BuildingInput = {
  address?: InputMaybe<AddressInput>
  attributes?: InputMaybe<Array<AttributeInput>>
  companies?: InputMaybe<Array<Scalars['String']['input']>>
  coordinate?: InputMaybe<CoordinateInput>
  name: Scalars['String']['input']
  platoons?: InputMaybe<Array<Scalars['String']['input']>>
  squads?: InputMaybe<Array<Scalars['String']['input']>>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type CombatEquipment = {
  __typename?: 'CombatEquipment'
  serialNumber: Scalars['String']['output']
  type?: Maybe<CombatEquipmentType>
  unit?: Maybe<Unit>
}

export type CombatEquipmentCategory = {
  __typename?: 'CombatEquipmentCategory'
  name: Scalars['String']['output']
}

export type CombatEquipmentFilter = {
  type?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type CombatEquipmentInput = {
  serialNumber: Scalars['String']['input']
  type?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type CombatEquipmentType = {
  __typename?: 'CombatEquipmentType'
  attributes?: Maybe<Array<Attribute>>
  category: CombatEquipmentCategory
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CombatEquipmentTypeFilter = {
  category?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type CombatEquipmentTypeInput = {
  attributes?: InputMaybe<Array<AttributeInput>>
  category: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type Company = {
  __typename?: 'Company'
  commander?: Maybe<Military>
  name: Scalars['String']['output']
  platoons: Array<Platoon>
  unit?: Maybe<Unit>
}

export type CompanyFilter = {
  commander?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type CompanyInput = {
  commander?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  unit?: InputMaybe<Scalars['String']['input']>
}

export type Coordinate = {
  __typename?: 'Coordinate'
  lat: Scalars['Float']['output']
  lng: Scalars['Float']['output']
}

export type CoordinateInput = {
  lat: Scalars['Float']['input']
  lng: Scalars['Float']['input']
}

export type Corps = {
  __typename?: 'Corps'
  armies: Array<Army>
  commander?: Maybe<Military>
  name: Scalars['String']['output']
  units: Array<Unit>
}

export type CorpsFilter = {
  commander?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type CorpsInput = {
  armies?: InputMaybe<Array<Scalars['String']['input']>>
  commander?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  units?: InputMaybe<Array<Scalars['String']['input']>>
}

export type Division = {
  __typename?: 'Division'
  armies: Array<Army>
  commander?: Maybe<Military>
  name: Scalars['String']['output']
  units: Array<Unit>
}

export type DivisionFilter = {
  commander?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type DivisionInput = {
  armies?: InputMaybe<Array<Scalars['String']['input']>>
  commander?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  units?: InputMaybe<Array<Scalars['String']['input']>>
}

export type Military = {
  __typename?: 'Military'
  attributes: Array<MilitaryAttribute>
  birthDate: Scalars['Date']['output']
  firstName: Scalars['String']['output']
  lastName: Scalars['String']['output']
  mbn: Scalars['String']['output']
  middleName?: Maybe<Scalars['String']['output']>
  rank?: Maybe<Rank>
  specialties: Array<Specialty>
  unit?: Maybe<Unit>
}

export type MilitaryAttribute = {
  __typename?: 'MilitaryAttribute'
  name: Scalars['String']['output']
  rank: Rank
  value: Scalars['String']['output']
}

export type MilitaryAttributeDefinition = {
  __typename?: 'MilitaryAttributeDefinition'
  name: Scalars['String']['output']
  rank: Rank
}

export type MilitaryAttributeDefinitionFilter = {
  rank?: InputMaybe<Scalars['String']['input']>
}

export type MilitaryAttributeInput = {
  name: Scalars['String']['input']
  rank: Scalars['String']['input']
  value: Scalars['String']['input']
}

export type MilitaryFilter = {
  name?: InputMaybe<Scalars['String']['input']>
  rank?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type MilitaryInput = {
  attributes?: InputMaybe<Array<MilitaryAttributeInput>>
  birthDate: Scalars['Date']['input']
  firstName: Scalars['String']['input']
  lastName: Scalars['String']['input']
  mbn: Scalars['String']['input']
  middleName?: InputMaybe<Scalars['String']['input']>
  rank?: InputMaybe<Scalars['String']['input']>
  specialties?: InputMaybe<Array<Scalars['String']['input']>>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createArmy?: Maybe<Army>
  createBrigade?: Maybe<Brigade>
  createBuilding?: Maybe<Building>
  createCombatEquipment?: Maybe<CombatEquipment>
  createCombatEquipmentCategory?: Maybe<CombatEquipmentCategory>
  createCombatEquipmentType?: Maybe<CombatEquipmentType>
  createCompany?: Maybe<Company>
  createCorps?: Maybe<Corps>
  createDivision?: Maybe<Division>
  createMilitary?: Maybe<Military>
  createPlatoon?: Maybe<Platoon>
  createSquad?: Maybe<Squad>
  createUnit?: Maybe<Unit>
  createWeapon?: Maybe<Weapon>
  createWeaponCategory?: Maybe<WeaponCategory>
  createWeaponType?: Maybe<WeaponType>
  deleteArmy?: Maybe<Scalars['Int']['output']>
  deleteBrigade?: Maybe<Scalars['Int']['output']>
  deleteBuilding?: Maybe<Scalars['Int']['output']>
  deleteCombatEquipment?: Maybe<Scalars['Int']['output']>
  deleteCombatEquipmentCategory?: Maybe<Scalars['Int']['output']>
  deleteCombatEquipmentType?: Maybe<Scalars['Int']['output']>
  deleteCompany?: Maybe<Scalars['Int']['output']>
  deleteCorps?: Maybe<Scalars['Int']['output']>
  deleteDivision?: Maybe<Scalars['Int']['output']>
  deleteMilitary?: Maybe<Scalars['Int']['output']>
  deletePlatoon?: Maybe<Scalars['Int']['output']>
  deleteSquad?: Maybe<Scalars['Int']['output']>
  deleteUnit?: Maybe<Scalars['Int']['output']>
  deleteWeapon?: Maybe<Scalars['Int']['output']>
  deleteWeaponCategory?: Maybe<Scalars['Int']['output']>
  deleteWeaponType?: Maybe<Scalars['Int']['output']>
  updateArmy?: Maybe<Army>
  updateBrigade?: Maybe<Brigade>
  updateBuilding?: Maybe<Building>
  updateCombatEquipment?: Maybe<CombatEquipment>
  updateCombatEquipmentCategory?: Maybe<CombatEquipmentCategory>
  updateCombatEquipmentType?: Maybe<CombatEquipmentType>
  updateCompany?: Maybe<Company>
  updateCorps?: Maybe<Corps>
  updateDivision?: Maybe<Division>
  updateMilitary?: Maybe<Military>
  updatePlatoon?: Maybe<Platoon>
  updateSquad?: Maybe<Squad>
  updateUnit?: Maybe<Unit>
  updateWeapon?: Maybe<Weapon>
  updateWeaponCategory?: Maybe<WeaponCategory>
  updateWeaponType?: Maybe<WeaponType>
}

export type MutationCreateArmyArguments = {
  input: ArmyInput
}

export type MutationCreateBrigadeArguments = {
  input: BrigadeInput
}

export type MutationCreateBuildingArguments = {
  input: BuildingInput
}

export type MutationCreateCombatEquipmentArguments = {
  input: CombatEquipmentInput
}

export type MutationCreateCombatEquipmentCategoryArguments = {
  input: Scalars['String']['input']
}

export type MutationCreateCombatEquipmentTypeArguments = {
  input: CombatEquipmentTypeInput
}

export type MutationCreateCompanyArguments = {
  input: CompanyInput
}

export type MutationCreateCorpsArguments = {
  input: CorpsInput
}

export type MutationCreateDivisionArguments = {
  input: DivisionInput
}

export type MutationCreateMilitaryArguments = {
  input: MilitaryInput
}

export type MutationCreatePlatoonArguments = {
  input: PlatoonInput
}

export type MutationCreateSquadArguments = {
  input: SquadInput
}

export type MutationCreateUnitArguments = {
  input: UnitInput
}

export type MutationCreateWeaponArguments = {
  input: WeaponInput
}

export type MutationCreateWeaponCategoryArguments = {
  input: Scalars['String']['input']
}

export type MutationCreateWeaponTypeArguments = {
  input: WeaponTypeInput
}

export type MutationDeleteArmyArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteBrigadeArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteBuildingArguments = {
  name: Scalars['String']['input']
  unit?: InputMaybe<Scalars['String']['input']>
}

export type MutationDeleteCombatEquipmentArguments = {
  serialNumber: Scalars['String']['input']
}

export type MutationDeleteCombatEquipmentCategoryArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteCombatEquipmentTypeArguments = {
  category: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type MutationDeleteCompanyArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteCorpsArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteDivisionArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteMilitaryArguments = {
  mbn: Scalars['String']['input']
}

export type MutationDeletePlatoonArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteSquadArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteUnitArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteWeaponArguments = {
  serialNumber: Scalars['String']['input']
}

export type MutationDeleteWeaponCategoryArguments = {
  name: Scalars['String']['input']
}

export type MutationDeleteWeaponTypeArguments = {
  category: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type MutationUpdateArmyArguments = {
  input: ArmyInput
  name: Scalars['String']['input']
}

export type MutationUpdateBrigadeArguments = {
  input: BrigadeInput
  name: Scalars['String']['input']
}

export type MutationUpdateBuildingArguments = {
  input: BuildingInput
  name: Scalars['String']['input']
  unit?: InputMaybe<Scalars['String']['input']>
}

export type MutationUpdateCombatEquipmentArguments = {
  input: CombatEquipmentInput
  serialNumber: Scalars['String']['input']
}

export type MutationUpdateCombatEquipmentCategoryArguments = {
  input: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type MutationUpdateCombatEquipmentTypeArguments = {
  category: Scalars['String']['input']
  input: CombatEquipmentTypeInput
  name: Scalars['String']['input']
}

export type MutationUpdateCompanyArguments = {
  input: CompanyInput
  name: Scalars['String']['input']
}

export type MutationUpdateCorpsArguments = {
  input: CorpsInput
  name: Scalars['String']['input']
}

export type MutationUpdateDivisionArguments = {
  input: DivisionInput
  name: Scalars['String']['input']
}

export type MutationUpdateMilitaryArguments = {
  input: MilitaryInput
  mbn: Scalars['String']['input']
}

export type MutationUpdatePlatoonArguments = {
  input: PlatoonInput
  name: Scalars['String']['input']
}

export type MutationUpdateSquadArguments = {
  input: SquadInput
  name: Scalars['String']['input']
}

export type MutationUpdateUnitArguments = {
  input: UnitInput
  name: Scalars['String']['input']
}

export type MutationUpdateWeaponArguments = {
  input: WeaponInput
  serialNumber: Scalars['String']['input']
}

export type MutationUpdateWeaponCategoryArguments = {
  input: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type MutationUpdateWeaponTypeArguments = {
  category: Scalars['String']['input']
  input: WeaponTypeInput
  name: Scalars['String']['input']
}

export type Pagination = {
  page: Scalars['Int']['input']
  pageSize: Scalars['Int']['input']
}

export type Platoon = {
  __typename?: 'Platoon'
  commander?: Maybe<Military>
  company?: Maybe<Company>
  name: Scalars['String']['output']
  squads: Array<Squad>
}

export type PlatoonInput = {
  commander?: InputMaybe<Scalars['String']['input']>
  company?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

export type PlatoonFilter = {
  commander?: InputMaybe<Scalars['String']['input']>
  company?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type Query = {
  __typename?: 'Query'
  getArmies?: Maybe<Array<Army>>
  getArmy?: Maybe<Army>
  getArmyCount?: Maybe<Scalars['Int']['output']>
  getBrigade?: Maybe<Brigade>
  getBrigadeCount?: Maybe<Scalars['Int']['output']>
  getBrigades?: Maybe<Array<Brigade>>
  getBuilding?: Maybe<Building>
  getBuildingCount?: Maybe<Scalars['Int']['output']>
  getBuildings?: Maybe<Array<Building>>
  getCombatEquipment?: Maybe<CombatEquipment>
  getCombatEquipmentCategories?: Maybe<Array<CombatEquipmentCategory>>
  getCombatEquipmentCategory?: Maybe<CombatEquipmentCategory>
  getCombatEquipmentCategoryCount?: Maybe<Scalars['Int']['output']>
  getCombatEquipmentCount?: Maybe<Scalars['Int']['output']>
  getCombatEquipmentType?: Maybe<CombatEquipmentType>
  getCombatEquipmentTypeCount?: Maybe<Scalars['Int']['output']>
  getCombatEquipmentTypes?: Maybe<Array<CombatEquipmentType>>
  getCombatEquipments?: Maybe<Array<CombatEquipment>>
  getCompanies?: Maybe<Array<Company>>
  getCompany?: Maybe<Company>
  getCompanyCount?: Maybe<Scalars['Int']['output']>
  getCorps?: Maybe<Array<Corps>>
  getCorpsCount?: Maybe<Scalars['Int']['output']>
  getDivision?: Maybe<Division>
  getDivisionCount?: Maybe<Scalars['Int']['output']>
  getDivisions?: Maybe<Array<Division>>
  getMilitaries?: Maybe<Array<Military>>
  getMilitary?: Maybe<Military>
  getMilitaryAttributeDefinitions?: Maybe<Array<MilitaryAttributeDefinition>>
  getMilitaryCount?: Maybe<Scalars['Int']['output']>
  getOneCorps?: Maybe<Corps>
  getPlatoon?: Maybe<Platoon>
  getPlatoonCount?: Maybe<Scalars['Int']['output']>
  getPlatoons?: Maybe<Array<Platoon>>
  getRankCategories?: Maybe<Array<RankCategory>>
  getRanks?: Maybe<Array<Rank>>
  getSpecialties?: Maybe<Array<Specialty>>
  getSquad?: Maybe<Squad>
  getSquadCount?: Maybe<Scalars['Int']['output']>
  getSquads?: Maybe<Array<Squad>>
  getUnit?: Maybe<Unit>
  getUnitCount?: Maybe<Scalars['Int']['output']>
  getUnits?: Maybe<Array<Unit>>
  getWeapon?: Maybe<Weapon>
  getWeaponCategories?: Maybe<Array<WeaponCategory>>
  getWeaponCategory?: Maybe<WeaponCategory>
  getWeaponCategoryCount?: Maybe<Scalars['Int']['output']>
  getWeaponCount?: Maybe<Scalars['Int']['output']>
  getWeaponType?: Maybe<WeaponType>
  getWeaponTypeCount?: Maybe<Scalars['Int']['output']>
  getWeaponTypes?: Maybe<Array<WeaponType>>
  getWeapons?: Maybe<Array<Weapon>>
}

export type QueryGetArmiesArguments = {
  commander?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<ArmyFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetArmyArguments = {
  name: Scalars['String']['input']
}

export type QueryGetArmyCountArguments = {
  filter?: InputMaybe<ArmyFilter>
}

export type QueryGetBrigadeArguments = {
  name: Scalars['String']['input']
}

export type QueryGetBrigadeCountArguments = {
  filter?: InputMaybe<BrigadeFilter>
}

export type QueryGetBrigadesArguments = {
  filter?: InputMaybe<BrigadeFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetBuildingArguments = {
  name: Scalars['String']['input']
  unit?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetBuildingCountArguments = {
  filter?: InputMaybe<BuildingFilter>
}

export type QueryGetBuildingsArguments = {
  filter?: InputMaybe<BuildingFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetCombatEquipmentArguments = {
  serialNumber: Scalars['String']['input']
}

export type QueryGetCombatEquipmentCategoriesArguments = {
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetCombatEquipmentCategoryArguments = {
  name: Scalars['String']['input']
}

export type QueryGetCombatEquipmentCountArguments = {
  filter?: InputMaybe<CombatEquipmentFilter>
}

export type QueryGetCombatEquipmentTypeArguments = {
  category: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type QueryGetCombatEquipmentTypeCountArguments = {
  filter?: InputMaybe<CombatEquipmentTypeFilter>
}

export type QueryGetCombatEquipmentTypesArguments = {
  filter?: InputMaybe<CombatEquipmentTypeFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetCombatEquipmentsArguments = {
  filter?: InputMaybe<CombatEquipmentFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetCompaniesArguments = {
  filter?: InputMaybe<CompanyFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetCompanyArguments = {
  name: Scalars['String']['input']
}

export type QueryGetCompanyCountArguments = {
  filter?: InputMaybe<CompanyFilter>
}

export type QueryGetCorpsArguments = {
  filter?: InputMaybe<CorpsFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetCorpsCountArguments = {
  filter?: InputMaybe<CorpsFilter>
}

export type QueryGetDivisionArguments = {
  name: Scalars['String']['input']
}

export type QueryGetDivisionCountArguments = {
  filter?: InputMaybe<DivisionFilter>
}

export type QueryGetDivisionsArguments = {
  filter?: InputMaybe<DivisionFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetMilitariesArguments = {
  filter?: InputMaybe<MilitaryFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetMilitaryArguments = {
  mbn: Scalars['String']['input']
}

export type QueryGetMilitaryAttributeDefinitionsArguments = {
  filter?: InputMaybe<MilitaryAttributeDefinitionFilter>
}

export type QueryGetMilitaryCountArguments = {
  filter?: InputMaybe<MilitaryFilter>
}

export type QueryGetOneCorpsArguments = {
  name: Scalars['String']['input']
}

export type QueryGetPlatoonArguments = {
  name: Scalars['String']['input']
}

export type QueryGetPlatoonCountArguments = {
  filter?: InputMaybe<PlatoonFilter>
}

export type QueryGetPlatoonsArguments = {
  filter?: InputMaybe<PlatoonFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetRanksArguments = {
  filter?: InputMaybe<RankFilter>
}

export type QueryGetSquadArguments = {
  name: Scalars['String']['input']
}

export type QueryGetSquadCountArguments = {
  filter?: InputMaybe<SquadFilter>
}

export type QueryGetSquadsArguments = {
  filter?: InputMaybe<SquadFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetUnitArguments = {
  name: Scalars['String']['input']
}

export type QueryGetUnitCountArguments = {
  filter?: InputMaybe<UnitFilter>
}

export type QueryGetUnitsArguments = {
  filter?: InputMaybe<UnitFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetWeaponArguments = {
  serialNumber: Scalars['String']['input']
}

export type QueryGetWeaponCategoriesArguments = {
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetWeaponCategoryArguments = {
  name: Scalars['String']['input']
}

export type QueryGetWeaponCountArguments = {
  filter?: InputMaybe<WeaponFilter>
}

export type QueryGetWeaponTypeArguments = {
  category: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type QueryGetWeaponTypeCountArguments = {
  filter?: InputMaybe<WeaponTypeFilter>
}

export type QueryGetWeaponTypesArguments = {
  filter?: InputMaybe<WeaponTypeFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type QueryGetWeaponsArguments = {
  filter?: InputMaybe<WeaponFilter>
  pagination?: InputMaybe<Pagination>
  sorts?: InputMaybe<Array<Sort>>
}

export type Rank = {
  __typename?: 'Rank'
  category: RankCategory
  level: Scalars['Int']['output']
  name: Scalars['String']['output']
}

export type RankCategory = {
  __typename?: 'RankCategory'
  name: Scalars['String']['output']
}

export type RankFilter = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type Sort = {
  field: Scalars['String']['input']
  sortAsc: Scalars['Boolean']['input']
}

export type Specialty = {
  __typename?: 'Specialty'
  code: Scalars['String']['output']
  name: Scalars['String']['output']
}

export type Squad = {
  __typename?: 'Squad'
  commander?: Maybe<Military>
  name: Scalars['String']['output']
  platoon?: Maybe<Platoon>
}

export type SquadFilter = {
  commander?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  platoon?: InputMaybe<Scalars['String']['input']>
}

export type SquadInput = {
  commander?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  platoon?: InputMaybe<Scalars['String']['input']>
}

export type Unit = {
  __typename?: 'Unit'
  address?: Maybe<Address>
  brigades: Array<Brigade>
  commander?: Maybe<Military>
  companies: Array<Company>
  coordinate?: Maybe<Coordinate>
  corps: Array<Corps>
  divisions: Array<Division>
  name: Scalars['String']['output']
}

export type UnitFilter = {
  address?: InputMaybe<Scalars['String']['input']>
  commander?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type UnitInput = {
  address?: InputMaybe<AddressInput>
  brigades?: InputMaybe<Array<Scalars['String']['input']>>
  commander?: InputMaybe<Scalars['String']['input']>
  coordinate?: InputMaybe<CoordinateInput>
  corps?: InputMaybe<Array<Scalars['String']['input']>>
  divisions?: InputMaybe<Array<Scalars['String']['input']>>
  name: Scalars['String']['input']
}

export type Weapon = {
  __typename?: 'Weapon'
  serialNumber: Scalars['String']['output']
  type?: Maybe<WeaponType>
  unit?: Maybe<Unit>
}

export type WeaponCategory = {
  __typename?: 'WeaponCategory'
  name: Scalars['String']['output']
}

export type WeaponFilter = {
  category?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type WeaponInput = {
  serialNumber: Scalars['String']['input']
  type?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type WeaponType = {
  __typename?: 'WeaponType'
  attributes?: Maybe<Array<Attribute>>
  category: WeaponCategory
  name: Scalars['String']['output']
}

export type WeaponTypeFilter = {
  category?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type WeaponTypeInput = {
  attributes?: InputMaybe<Array<AttributeInput>>
  category: Scalars['String']['input']
  name: Scalars['String']['input']
}
