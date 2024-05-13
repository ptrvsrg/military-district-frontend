import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Division,
  Maybe,
  MutationCreateDivisionArguments,
  MutationDeleteDivisionArguments,
  MutationUpdateDivisionArguments,
  QueryGetDivisionArguments,
  QueryGetDivisionCountArguments,
  QueryGetDivisionsArguments,
} from '../../models/graphql/schema.ts'
import {
  CREATE_DIVISION,
  DELETE_DIVISION,
  GET_ALL_DIVISION_NAMES,
  GET_DIVISION,
  GET_DIVISION_COUNT,
  GET_DIVISIONS,
  UPDATE_DIVISION,
} from './queries.ts'

export class DivisionService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getDivisionNames(): Promise<string[]> {
    const data = await this.graphQlClient.query(GET_ALL_DIVISION_NAMES, {}, true)
    return data.getDivisions?.map((division) => division.name) ?? []
  }

  public async getDivisions(parameters: QueryGetDivisionsArguments): Promise<Division[]> {
    const data = await this.graphQlClient.query(GET_DIVISIONS, parameters, true)
    return data.getDivisions ?? []
  }

  public async getDivisionCount(parameters: QueryGetDivisionCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_DIVISION_COUNT, parameters, true)
    return data.getDivisionCount ?? 0
  }

  public async getDivision(parameters: QueryGetDivisionArguments): Promise<Maybe<Division> | undefined> {
    const data = await this.graphQlClient.query(GET_DIVISION, parameters, true)
    return data.getDivision
  }

  public async createDivision(parameters: MutationCreateDivisionArguments): Promise<Maybe<Division> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_DIVISION, parameters, true)
    return data.createDivision
  }

  public async updateDivision(parameters: MutationUpdateDivisionArguments): Promise<Maybe<Division> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_DIVISION, parameters, true)
    return data.updateDivision
  }

  public async deleteDivision(parameters: MutationDeleteDivisionArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_DIVISION, parameters, true)
    return data.deleteDivision ?? 0
  }
}
