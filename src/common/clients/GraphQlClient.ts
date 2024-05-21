import type { DocumentNode } from 'graphql/index'

import { ApolloClient, ApolloError, MutationOptions, QueryOptions } from '@apollo/client'

import { Mutation, Query } from '../../models/graphql/schema.ts'
import keycloak from '../../stores/AuthStore.ts'
import apolloClient from '../../stores/GraphQlStore.ts'
import { addAlert } from '../../utils/alert.tsx'
import { Dictionary } from '../types/Dictionary.ts'

export class GraphQlClient {
  private static instance: GraphQlClient

  private readonly client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  public static getInstance(): GraphQlClient {
    if (!GraphQlClient.instance) {
      GraphQlClient.instance = new GraphQlClient(apolloClient)
    }
    return GraphQlClient.instance
  }

  public async query(query: DocumentNode, variables?: Dictionary<any>, secureRequired?: boolean, headers?: Dictionary<string>): Promise<Query> {
    const options: QueryOptions = {
      context: {
        headers: this.getHeaders(secureRequired, headers),
      },
      query,
      variables,
    }
    try {
      const result = await this.client.query(options)
      return result.data
    } catch (error) {
      const message = this.getErrorMessage(error)
      if (message) addAlert(message, 'error')
      throw error
    }
  }

  public async mutation(
    mutation: DocumentNode,
    variables?: Dictionary<any>,
    secureRequired?: boolean,
    headers?: Dictionary<string>
  ): Promise<Mutation> {
    const options: MutationOptions = {
      context: {
        headers: this.getHeaders(secureRequired, headers),
      },
      mutation,
      variables,
    }
    try {
      const result = await this.client.mutate(options)
      return result.data
    } catch (error) {
      const message = this.getErrorMessage(error)
      if (message) addAlert(message, 'error')
      throw error
    }
  }

  private getErrorMessage(error: any): string | undefined {
    const apolloError = error as ApolloError
    if (apolloError.graphQLErrors?.length > 0) {
      const message = apolloError.graphQLErrors
        .filter((graphQLError) =>
          ['BAD_REQUEST', 'FORBIDDEN', 'INTERNAL_ERROR', 'NOT_FOUND', 'UNAUTHORIZED'].includes(graphQLError.extensions.classification as string)
        )
        .map((graphQLError) => graphQLError.message)
        .reduce((graphQLError1, graphQLError2) => `${graphQLError1} ${graphQLError2}`, '')
      return message === '' ? undefined : message
    }
    return apolloError.message
  }

  private getHeaders(secureRequired?: boolean, headers?: Dictionary<string>): Dictionary<string> {
    if (!secureRequired) {
      return { ...headers }
    }
    return {
      ...headers,
      Authorization: `Bearer ${keycloak.token}`,
    }
  }
}
