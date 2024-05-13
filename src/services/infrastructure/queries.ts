import { gql } from '@apollo/client'

export const GET_BUILDINGS = gql`
  query GetBuildings($filter: BuildingFilter, $pagination: Pagination, $sorts: [Sort!]) {
    getBuildings(filter: $filter, pagination: $pagination, sorts: $sorts) {
      address {
        country
        houseNumber
        locality
        postCode
        state
        street
      }
      companies {
        name
      }
      coordinate {
        lat
        lng
      }
      name
      platoons {
        name
      }
      squads {
        name
      }
      unit {
        name
      }
    }
  }
`

export const GET_BUILDING_COUNT = gql`
  query GetBuildingCount($filter: BuildingFilter) {
    getBuildingCount(filter: $filter)
  }
`

export const GET_BUILDING = gql`
  query GetBuilding($name: String!, $unit: String) {
    getBuilding(name: $name, unit: $unit) {
      address {
        country
        houseNumber
        locality
        postCode
        state
        street
      }
      attributes {
        name
        value
      }
      companies {
        name
      }
      coordinate {
        lat
        lng
      }
      name
      platoons {
        name
      }
      squads {
        name
      }
      unit {
        name
      }
    }
  }
`

export const CREATE_BUILDING = gql`
  mutation CreateBuilding($input: BuildingInput!) {
    createBuilding(input: $input) {
      name
      unit {
        name
      }
    }
  }
`

export const UPDATE_BUILDING = gql`
  mutation UpdateBuilding($input: BuildingInput!, $name: String!, $unit: String) {
    updateBuilding(input: $input, name: $name, unit: $unit) {
      name
      unit {
        name
      }
    }
  }
`

export const DELETE_BUILDING = gql`
  mutation DeleteBuilding($name: String!, $unit: String) {
    deleteBuilding(name: $name, unit: $unit)
  }
`
