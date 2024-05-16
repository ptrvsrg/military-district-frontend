import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import { UnitPlacement } from '../../models/graphql/fragments.ts'
import {
  Maybe,
  MutationCreateUnitArguments,
  MutationDeleteUnitArguments,
  MutationUpdateUnitArguments,
  QueryGetUnitArguments,
  QueryGetUnitCountArguments,
  QueryGetUnitsArguments,
  Unit,
} from '../../models/graphql/schema.ts'
import { CREATE_UNIT, DELETE_UNIT, GET_ALL_UNIT_NAMES, GET_ALL_UNIT_PLACEMENTS, GET_UNIT, GET_UNIT_COUNT, GET_UNITS, UPDATE_UNIT } from './queries.ts'

export class UnitService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getUnitNames(): Promise<string[]> {
    const data = await this.graphQlClient.query(GET_ALL_UNIT_NAMES, {}, true)
    return data.getUnits?.map((unit) => unit.name) ?? []
  }

  public async getUnitPlacements(): Promise<UnitPlacement[]> {
    const data = await this.graphQlClient.query(GET_ALL_UNIT_PLACEMENTS, {}, true)
    return data.getUnits ?? []
  }

  public async getUnits(parameters: QueryGetUnitsArguments): Promise<Unit[]> {
    const data = await this.graphQlClient.query(GET_UNITS, parameters, true)
    return data.getUnits ?? []
  }

  public async getUnitCount(parameters: QueryGetUnitCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_UNIT_COUNT, parameters, true)
    return data.getUnitCount ?? 0
  }

  public async getUnit(parameters: QueryGetUnitArguments): Promise<Maybe<Unit> | undefined> {
    const data = await this.graphQlClient.query(GET_UNIT, parameters, true)
    return data.getUnit
  }

  public async createUnit(parameters: MutationCreateUnitArguments): Promise<Maybe<Unit> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_UNIT, parameters, true)
    return data.createUnit
  }

  public async updateUnit(parameters: MutationUpdateUnitArguments): Promise<Maybe<Unit> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_UNIT, parameters, true)
    return data.updateUnit
  }

  public async deleteUnit(parameters: MutationDeleteUnitArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_UNIT, parameters, true)
    return data.deleteUnit ?? 0
  }
}
