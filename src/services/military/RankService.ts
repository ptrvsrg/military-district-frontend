import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import { Rank } from '../../models/graphql/schema.ts'
import { GET_ALL_RANKS } from './queries.ts'

export class RankService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getRanks(): Promise<Rank[]> {
    const data = await this.graphQlClient.query(GET_ALL_RANKS, {}, true)
    return data.getRanks ?? []
  }
}
