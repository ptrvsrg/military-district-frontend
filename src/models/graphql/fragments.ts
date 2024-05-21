import { gql } from '@apollo/client'

import { Coordinate, Maybe, Scalars } from './schema.ts'

export const UnitPlacementFragment = gql`
  fragment UnitPlacement on Unit {
    name
    coordinate {
      lat
      lng
    }
  }
`

export type UnitPlacement = {
  coordinate?: Maybe<Coordinate>
  name: Scalars['String']['output']
}

export const MilitaryBriefFragment = gql`
  fragment MilitaryBrief on Military {
    mbn
    firstName
    lastName
    middleName
  }
`

export type MilitaryBrief = {
  firstName: Scalars['String']['output']
  lastName: Scalars['String']['output']
  mbn: Scalars['String']['output']
  middleName?: Maybe<Scalars['String']['output']>
}
