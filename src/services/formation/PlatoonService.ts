import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Maybe,
  MutationCreatePlatoonArguments,
  MutationDeletePlatoonArguments,
  MutationUpdatePlatoonArguments,
  Platoon,
  QueryGetPlatoonArguments,
  QueryGetPlatoonCountArguments,
  QueryGetPlatoonsArguments,
} from '../../models/graphql/schema.ts'
import { CREATE_PLATOON, DELETE_PLATOON, GET_ALL_PLATOON_NAMES, GET_PLATOON, GET_PLATOON_COUNT, GET_PLATOONS, UPDATE_PLATOON } from './queries.ts'

export class PlatoonService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getPlatoonNames(): Promise<string[]> {
    const data = await this.graphQlClient.query(GET_ALL_PLATOON_NAMES, {}, true)
    return data.getPlatoons?.map((platoon) => platoon.name) ?? []
  }

  public async getPlatoons(parameters: QueryGetPlatoonsArguments): Promise<Platoon[]> {
    const data = await this.graphQlClient.query(GET_PLATOONS, parameters, true)
    return data.getPlatoons ?? []
  }

  public async getPlatoonCount(parameters: QueryGetPlatoonCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_PLATOON_COUNT, parameters, true)
    return data.getPlatoonCount ?? 0
  }

  public async getPlatoon(parameters: QueryGetPlatoonArguments): Promise<Maybe<Platoon> | undefined> {
    const data = await this.graphQlClient.query(GET_PLATOON, parameters, true)
    return data.getPlatoon
  }

  public async createPlatoon(parameters: MutationCreatePlatoonArguments): Promise<Maybe<Platoon> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_PLATOON, parameters, true)
    return data.createPlatoon
  }

  public async updatePlatoon(parameters: MutationUpdatePlatoonArguments): Promise<Maybe<Platoon> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_PLATOON, parameters, true)
    return data.updatePlatoon
  }

  public async deletePlatoon(parameters: MutationDeletePlatoonArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_PLATOON, parameters, true)
    return data.deletePlatoon ?? 0
  }
}
