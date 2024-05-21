import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import { MilitaryBrief } from '../../models/graphql/fragments.ts'
import {
  Maybe,
  Military,
  MutationCreateMilitaryArguments,
  MutationDeleteMilitaryArguments,
  MutationUpdateMilitaryArguments,
  QueryGetMilitariesArguments,
  QueryGetMilitaryArguments,
  QueryGetMilitaryCountArguments,
} from '../../models/graphql/schema.ts'
import {
  CREATE_MILITARY,
  DELETE_MILITARY,
  GET_ALL_MILITARY_BRIEFS,
  GET_MILITARIES,
  GET_MILITARY,
  GET_MILITARY_COUNT,
  UPDATE_MILITARY,
} from './queries.ts'

export class MilitaryService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getMilitaries(parameters: QueryGetMilitariesArguments): Promise<Military[]> {
    const data = await this.graphQlClient.query(GET_MILITARIES, parameters, true)
    return data.getMilitaries ?? []
  }

  public async getMilitaryBriefs(): Promise<MilitaryBrief[]> {
    const data = await this.graphQlClient.query(GET_ALL_MILITARY_BRIEFS, {}, true)
    return data.getMilitaries ?? []
  }

  public async getMilitaryCount(parameters: QueryGetMilitaryCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_MILITARY_COUNT, parameters, true)
    return data.getMilitaryCount ?? 0
  }

  public async getMilitary(parameters: QueryGetMilitaryArguments): Promise<Maybe<Military> | undefined> {
    const data = await this.graphQlClient.query(GET_MILITARY, parameters, true)
    return data.getMilitary
  }

  public async createMilitary(parameters: MutationCreateMilitaryArguments): Promise<Maybe<Military> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_MILITARY, parameters, true)
    return data.createMilitary
  }

  public async updateMilitary(parameters: MutationUpdateMilitaryArguments): Promise<Maybe<Military> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_MILITARY, parameters, true)
    return data.updateMilitary
  }

  public async deleteMilitary(parameters: MutationDeleteMilitaryArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_MILITARY, parameters, true)
    return data.deleteMilitary ?? 0
  }
}
