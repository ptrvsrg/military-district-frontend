import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import { Specialty } from '../../models/graphql/schema.ts'
import { GET_ALL_SPECIALTIES } from './queries.ts'

export class SpecialtyService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getSpecialties(): Promise<Specialty[]> {
    const data = await this.graphQlClient.query(GET_ALL_SPECIALTIES, {}, true)
    return data.getSpecialties ?? []
  }
}
