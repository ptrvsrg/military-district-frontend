import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Corps,
  Maybe,
  MutationCreateCorpsArguments,
  MutationDeleteCorpsArguments,
  MutationUpdateCorpsArguments,
  QueryGetCorpsArguments,
  QueryGetCorpsCountArguments,
  QueryGetOneCorpsArguments,
} from '../../models/graphql/schema.ts'
import { CREATE_CORPS, DELETE_CORPS, GET_ALL_CORPS_NAMES, GET_CORPS, GET_CORPS_COUNT, GET_ONE_CORPS, UPDATE_CORPS } from './queries.ts'

export class CorpsService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getCorpsNames(): Promise<string[]> {
    const data = await this.graphQlClient.query(GET_ALL_CORPS_NAMES, {}, true)
    return data.getCorps?.map((corps) => corps.name) ?? []
  }

  public async getCorps(parameters: QueryGetCorpsArguments): Promise<Corps[]> {
    const data = await this.graphQlClient.query(GET_CORPS, parameters, true)
    return data.getCorps ?? []
  }

  public async getCorpsCount(parameters: QueryGetCorpsCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_CORPS_COUNT, parameters, true)
    return data.getCorpsCount ?? 0
  }

  public async getOneCorps(parameters: QueryGetOneCorpsArguments): Promise<Maybe<Corps> | undefined> {
    const data = await this.graphQlClient.query(GET_ONE_CORPS, parameters, true)
    return data.getOneCorps
  }

  public async createCorps(parameters: MutationCreateCorpsArguments): Promise<Maybe<Corps> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_CORPS, parameters, true)
    return data.createCorps
  }

  public async updateCorps(parameters: MutationUpdateCorpsArguments): Promise<Maybe<Corps> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_CORPS, parameters, true)
    return data.updateCorps
  }

  public async deleteCorps(parameters: MutationDeleteCorpsArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_CORPS, parameters, true)
    return data.deleteCorps ?? 0
  }
}
