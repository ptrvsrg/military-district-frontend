import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Army,
  Maybe,
  MutationCreateArmyArguments,
  MutationDeleteArmyArguments,
  MutationUpdateArmyArguments,
  QueryGetArmiesArguments,
  QueryGetArmyArguments,
  QueryGetArmyCountArguments,
} from '../../models/graphql/schema.ts'
import { CREATE_ARMY, DELETE_ARMY, GET_ALL_ARMY_NAMES, GET_ARMIES, GET_ARMY, GET_ARMY_COUNT, UPDATE_ARMY } from './queries.ts'

export class ArmyService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getArmyNames(): Promise<string[]> {
    const data = await this.graphQlClient.query(GET_ALL_ARMY_NAMES, {}, true)
    return data.getArmies?.map((army) => army.name) ?? []
  }

  public async getArmies(parameters: QueryGetArmiesArguments): Promise<Army[]> {
    const data = await this.graphQlClient.query(GET_ARMIES, parameters, true)
    return data.getArmies ?? []
  }

  public async getArmyCount(parameters: QueryGetArmyCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_ARMY_COUNT, parameters, true)
    return data.getArmyCount ?? 0
  }

  public async getArmy(parameters: QueryGetArmyArguments): Promise<Maybe<Army> | undefined> {
    const data = await this.graphQlClient.query(GET_ARMY, parameters, true)
    return data.getArmy
  }

  public async createArmy(parameters: MutationCreateArmyArguments): Promise<Maybe<Army> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_ARMY, parameters, true)
    return data.createArmy
  }

  public async updateArmy(parameters: MutationUpdateArmyArguments): Promise<Maybe<Army> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_ARMY, parameters, true)
    return data.updateArmy
  }

  public async deleteArmy(parameters: MutationDeleteArmyArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_ARMY, parameters, true)
    return data.deleteArmy ?? 0
  }
}
