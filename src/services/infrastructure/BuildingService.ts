import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Building,
  Maybe,
  MutationCreateBuildingArguments,
  MutationDeleteBuildingArguments,
  MutationUpdateBuildingArguments,
  QueryGetBuildingArguments,
  QueryGetBuildingCountArguments,
  QueryGetBuildingsArguments,
} from '../../models/graphql/schema.ts'
import { CREATE_BUILDING, DELETE_BUILDING, GET_BUILDING, GET_BUILDING_COUNT, GET_BUILDINGS, UPDATE_BUILDING } from './queries.ts'

export class BuildingService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getBuildings(parameters: QueryGetBuildingsArguments): Promise<Building[]> {
    const data = await this.graphQlClient.query(GET_BUILDINGS, parameters, true)
    return data.getBuildings ?? []
  }

  public async getBuildingCount(parameters: QueryGetBuildingCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_BUILDING_COUNT, parameters, true)
    return data.getBuildingCount ?? 0
  }

  public async getBuilding(parameters: QueryGetBuildingArguments): Promise<Maybe<Building> | undefined> {
    const data = await this.graphQlClient.query(GET_BUILDING, parameters, true)
    return data.getBuilding
  }

  public async createBuilding(parameters: MutationCreateBuildingArguments): Promise<Maybe<Building> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_BUILDING, parameters, true)
    return data.createBuilding
  }

  public async updateBuilding(parameters: MutationUpdateBuildingArguments): Promise<Maybe<Building> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_BUILDING, parameters, true)
    return data.updateBuilding
  }

  public async deleteBuilding(parameters: MutationDeleteBuildingArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_BUILDING, parameters, true)
    return data.deleteBuilding ?? 0
  }
}
