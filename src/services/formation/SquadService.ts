import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Maybe,
  MutationCreateSquadArguments,
  MutationDeleteSquadArguments,
  MutationUpdateSquadArguments,
  QueryGetSquadArguments,
  QueryGetSquadCountArguments,
  QueryGetSquadsArguments,
  Squad,
} from '../../models/graphql/schema.ts'
import { CREATE_SQUAD, DELETE_SQUAD, GET_ALL_SQUAD_NAMES, GET_SQUAD, GET_SQUAD_COUNT, GET_SQUADS, UPDATE_SQUAD } from './queries.ts'

export class SquadService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getSquadNames(): Promise<string[]> {
    const data = await this.graphQlClient.query(GET_ALL_SQUAD_NAMES, {}, true)
    return data.getSquads?.map((squad) => squad.name) ?? []
  }

  public async getSquads(parameters: QueryGetSquadsArguments): Promise<Squad[]> {
    const data = await this.graphQlClient.query(GET_SQUADS, parameters, true)
    return data.getSquads ?? []
  }

  public async getSquadCount(parameters: QueryGetSquadCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_SQUAD_COUNT, parameters, true)
    return data.getSquadCount ?? 0
  }

  public async getSquad(parameters: QueryGetSquadArguments): Promise<Maybe<Squad> | undefined> {
    const data = await this.graphQlClient.query(GET_SQUAD, parameters, true)
    return data.getSquad
  }

  public async createSquad(parameters: MutationCreateSquadArguments): Promise<Maybe<Squad> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_SQUAD, parameters, true)
    return data.createSquad
  }

  public async updateSquad(parameters: MutationUpdateSquadArguments): Promise<Maybe<Squad> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_SQUAD, parameters, true)
    return data.updateSquad
  }

  public async deleteSquad(parameters: MutationDeleteSquadArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_SQUAD, parameters, true)
    return data.deleteSquad ?? 0
  }
}
