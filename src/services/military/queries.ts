import { gql } from '@apollo/client'

export const GET_MILITARIES = gql`
  query GetMilitaries($filter: MilitaryFilter, $pagination: Pagination, $sorts: [Sort!]) {
    getMilitaries(filter: $filter, pagination: $pagination, sorts: $sorts) {
      mbn
      birthDate
      firstName
      lastName
      middleName
      rank {
        name
      }
      unit {
        name
      }
    }
  }
`

export const GET_ALL_MILITARY_BRIEFS = gql`
  query GetAllMilitaryBriefs {
    getMilitaries {
      ...MilitaryBrief
    }
  }
`

export const GET_MILITARY_COUNT = gql`
  query GetMilitaryCount($filter: MilitaryFilter) {
    getMilitaryCount(filter: $filter)
  }
`

export const GET_MILITARY = gql`
  query GetMilitary($mbn: String!) {
    getMilitary(mbn: $mbn) {
      mbn
      attributes {
        name
        rank {
          name
        }
        value
      }
      birthDate
      firstName
      lastName
      middleName
      rank {
        name
      }
      specialties {
        code
        name
      }
      unit {
        name
      }
    }
  }
`

export const CREATE_MILITARY = gql`
  mutation CreateMilitary($input: MilitaryInput!) {
    createMilitary(input: $input) {
      mbn
    }
  }
`

export const UPDATE_MILITARY = gql`
  mutation UpdateMilitary($mbn: String!, $input: MilitaryInput!) {
    updateMilitary(mbn: $mbn, input: $input) {
      mbn
    }
  }
`

export const DELETE_MILITARY = gql`
  mutation DeleteMilitary($mbn: String!) {
    deleteMilitary(mbn: $mbn)
  }
`

export const GET_ALL_RANKS = gql`
  query GetAllRanks {
    getRanks {
      name
      level
      category {
        name
      }
    }
  }
`

export const GET_ALL_SPECIALTIES = gql`
  query GetAllSpecialties {
    getSpecialties {
      name
      code
    }
  }
`
