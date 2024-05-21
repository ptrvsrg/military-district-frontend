import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Brigade,
  Maybe,
  MutationCreateBrigadeArguments,
  MutationDeleteBrigadeArguments,
  MutationUpdateBrigadeArguments,
  QueryGetBrigadeArguments,
  QueryGetBrigadeCountArguments,
  QueryGetBrigadesArguments,
} from '../../models/graphql/schema.ts'
import { CREATE_BRIGADE, DELETE_BRIGADE, GET_ALL_BRIGADE_NAMES, GET_BRIGADE, GET_BRIGADE_COUNT, GET_BRIGADES, UPDATE_BRIGADE } from './queries.ts'

export class BrigadeService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getBrigadeNames(): Promise<string[]> {
    const data = await this.graphQlClient.query(GET_ALL_BRIGADE_NAMES, {}, true)
    return data.getBrigades?.map((brigade) => brigade.name) ?? []
  }

  public async getBrigades(parameters: QueryGetBrigadesArguments): Promise<Brigade[]> {
    const data = await this.graphQlClient.query(GET_BRIGADES, parameters, true)
    return data.getBrigades ?? []
  }

  public async getBrigadeCount(parameters: QueryGetBrigadeCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_BRIGADE_COUNT, parameters, true)
    return data.getBrigadeCount ?? 0
  }

  public async getBrigade(parameters: QueryGetBrigadeArguments): Promise<Maybe<Brigade> | undefined> {
    const data = await this.graphQlClient.query(GET_BRIGADE, parameters, true)
    return data.getBrigade
  }

  public async createBrigade(parameters: MutationCreateBrigadeArguments): Promise<Maybe<Brigade> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_BRIGADE, parameters, true)
    return data.createBrigade
  }

  public async updateBrigade(parameters: MutationUpdateBrigadeArguments): Promise<Maybe<Brigade> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_BRIGADE, parameters, true)
    return data.updateBrigade
  }

  public async deleteBrigade(parameters: MutationDeleteBrigadeArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_BRIGADE, parameters, true)
    return data.deleteBrigade ?? 0
  }
}
