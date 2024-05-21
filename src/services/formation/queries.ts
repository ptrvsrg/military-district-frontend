import { gql } from '@apollo/client'

// UNITS

export const GET_ALL_UNIT_PLACEMENTS = gql`
  query GetAllUnitCoordinates {
    getUnits {
      ...UnitPlacement
    }
  }
`

export const GET_ALL_UNIT_NAMES = gql`
  query GetAllUnitNames {
    getUnits {
      name
    }
  }
`

export const GET_UNITS = gql`
  query GetUnits($pagination: Pagination, $filter: UnitFilter, $sorts: [Sort!]) {
    getUnits(pagination: $pagination, filter: $filter, sorts: $sorts) {
      address {
        country
        houseNumber
        locality
        postCode
        state
        street
      }
      name
      brigades {
        name
      }
      commander {
        ...MilitaryBrief
      }
      companies {
        name
      }
      coordinate {
        lat
        lng
      }
      corps {
        name
      }
      divisions {
        name
      }
    }
  }
`

export const GET_UNIT_COUNT = gql`
  query GetUnitCount($filter: UnitFilter) {
    getUnitCount(filter: $filter)
  }
`

export const GET_UNIT = gql`
  query GetUnit($name: String!) {
    getUnit(name: $name) {
      address {
        country
        houseNumber
        locality
        postCode
        state
        street
      }
      name
      brigades {
        name
      }
      commander {
        ...MilitaryBrief
      }
      companies {
        name
      }
      coordinate {
        lat
        lng
      }
      corps {
        name
      }
      divisions {
        name
      }
    }
  }
`

export const CREATE_UNIT = gql`
  mutation CreateUnit($input: UnitInput!) {
    createUnit(input: $input) {
      name
    }
  }
`

export const UPDATE_UNIT = gql`
  mutation UpdateUnit($name: String!, $input: UnitInput!) {
    updateUnit(name: $name, input: $input) {
      name
    }
  }
`

export const DELETE_UNIT = gql`
  mutation DeleteUnit($name: String!) {
    deleteUnit(name: $name)
  }
`

// COMPANIES

export const GET_ALL_COMPANY_NAMES = gql`
  query GetAllCompanyNames {
    getCompanies {
      name
    }
  }
`

export const GET_COMPANIES = gql`
  query GetCompanies($pagination: Pagination, $filter: CompanyFilter, $sorts: [Sort!]) {
    getCompanies(pagination: $pagination, filter: $filter, sorts: $sorts) {
      name
      commander {
        ...MilitaryBrief
      }
      unit {
        name
      }
      platoons {
        name
      }
    }
  }
`

export const GET_COMPANY_COUNT = gql`
  query GetCompanyCount($filter: CompanyFilter) {
    getCompanyCount(filter: $filter)
  }
`

export const GET_COMPANY = gql`
  query GetCompany($name: String!) {
    getCompany(name: $name) {
      name
      commander {
        ...MilitaryBrief
      }
      unit {
        name
      }
      platoons {
        name
      }
    }
  }
`

export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      name
    }
  }
`

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($name: String!, $input: CompanyInput!) {
    updateCompany(name: $name, input: $input) {
      name
    }
  }
`

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($name: String!) {
    deleteCompany(name: $name)
  }
`

// PLATOONS

export const GET_ALL_PLATOON_NAMES = gql`
  query GetAllPlatoonNames {
    getPlatoons {
      name
    }
  }
`

export const GET_PLATOONS = gql`
  query GetPlatoons($pagination: Pagination, $filter: PlatoonFilter, $sorts: [Sort!]) {
    getPlatoons(pagination: $pagination, filter: $filter, sorts: $sorts) {
      name
      commander {
        ...MilitaryBrief
      }
      company {
        name
      }
      squads {
        name
      }
    }
  }
`

export const GET_PLATOON_COUNT = gql`
  query GetPlatoonCount($filter: PlatoonFilter) {
    getPlatoonCount(filter: $filter)
  }
`

export const GET_PLATOON = gql`
  query GetPlatoon($name: String!) {
    getPlatoon(name: $name) {
      name
      commander {
        ...MilitaryBrief
      }
      company {
        name
      }
      squads {
        name
      }
    }
  }
`

export const CREATE_PLATOON = gql`
  mutation CreatePlatoon($input: PlatoonInput!) {
    createPlatoon(input: $input) {
      name
    }
  }
`

export const UPDATE_PLATOON = gql`
  mutation UpdatePlatoon($name: String!, $input: PlatoonInput!) {
    updatePlatoon(name: $name, input: $input) {
      name
    }
  }
`

export const DELETE_PLATOON = gql`
  mutation DeletePlatoon($name: String!) {
    deletePlatoon(name: $name)
  }
`

// SQUADS

export const GET_ALL_SQUAD_NAMES = gql`
  query GetAllSquadNames {
    getSquads {
      name
    }
  }
`

export const GET_SQUADS = gql`
  query GetSquads($pagination: Pagination, $filter: SquadFilter, $sorts: [Sort!]) {
    getSquads(pagination: $pagination, filter: $filter, sorts: $sorts) {
      name
      commander {
        ...MilitaryBrief
      }
      platoon {
        name
      }
    }
  }
`

export const GET_SQUAD_COUNT = gql`
  query GetSquadCount($filter: SquadFilter) {
    getSquadCount(filter: $filter)
  }
`

export const GET_SQUAD = gql`
  query GetSquad($name: String!) {
    getSquad(name: $name) {
      name
      commander {
        ...MilitaryBrief
      }
      platoon {
        name
      }
    }
  }
`

export const CREATE_SQUAD = gql`
  mutation CreateSquad($input: SquadInput!) {
    createSquad(input: $input) {
      name
    }
  }
`

export const UPDATE_SQUAD = gql`
  mutation UpdateSquad($name: String!, $input: SquadInput!) {
    updateSquad(name: $name, input: $input) {
      name
    }
  }
`

export const DELETE_SQUAD = gql`
  mutation DeleteSquad($name: String!) {
    deleteSquad(name: $name)
  }
`

// BRIGADES

export const GET_ALL_BRIGADE_NAMES = gql`
  query GetAllBrigadeNames {
    getBrigades {
      name
    }
  }
`

export const GET_BRIGADES = gql`
  query GetBrigades($pagination: Pagination, $filter: BrigadeFilter, $sorts: [Sort!]) {
    getBrigades(pagination: $pagination, filter: $filter, sorts: $sorts) {
      name
      armies {
        name
      }
      commander {
        ...MilitaryBrief
      }
      units {
        name
      }
    }
  }
`

export const GET_BRIGADE_COUNT = gql`
  query GetBrigadeCount($filter: BrigadeFilter) {
    getBrigadeCount(filter: $filter)
  }
`

export const GET_BRIGADE = gql`
  query GetBrigade($name: String!) {
    getBrigade(name: $name) {
      name
      armies {
        name
      }
      commander {
        ...MilitaryBrief
      }
      units {
        name
      }
    }
  }
`

export const CREATE_BRIGADE = gql`
  mutation CreateBrigade($input: BrigadeInput!) {
    createBrigade(input: $input) {
      name
    }
  }
`

export const UPDATE_BRIGADE = gql`
  mutation UpdateBrigade($name: String!, $input: BrigadeInput!) {
    updateBrigade(name: $name, input: $input) {
      name
    }
  }
`

export const DELETE_BRIGADE = gql`
  mutation DeleteBrigade($name: String!) {
    deleteBrigade(name: $name)
  }
`

// DIVISIONS

export const GET_ALL_DIVISION_NAMES = gql`
  query GetAllDivisionNames {
    getDivisions {
      name
    }
  }
`

export const GET_DIVISIONS = gql`
  query GetDivisions($pagination: Pagination, $filter: DivisionFilter, $sorts: [Sort!]) {
    getDivisions(pagination: $pagination, filter: $filter, sorts: $sorts) {
      name
      armies {
        name
      }
      commander {
        ...MilitaryBrief
      }
      units {
        name
      }
    }
  }
`

export const GET_DIVISION_COUNT = gql`
  query GetDivisionCount($filter: DivisionFilter) {
    getDivisionCount(filter: $filter)
  }
`

export const GET_DIVISION = gql`
  query GetDivision($name: String!) {
    getDivision(name: $name) {
      name
      armies {
        name
      }
      commander {
        ...MilitaryBrief
      }
      units {
        name
      }
    }
  }
`

export const CREATE_DIVISION = gql`
  mutation CreateDivision($input: DivisionInput!) {
    createDivision(input: $input) {
      name
    }
  }
`

export const UPDATE_DIVISION = gql`
  mutation UpdateDivision($name: String!, $input: DivisionInput!) {
    updateDivision(name: $name, input: $input) {
      name
    }
  }
`

export const DELETE_DIVISION = gql`
  mutation DeleteDivision($name: String!) {
    deleteDivision(name: $name)
  }
`

// CORPS

export const GET_ALL_CORPS_NAMES = gql`
  query GetAllCorpsNames {
    getCorps {
      name
    }
  }
`

export const GET_CORPS = gql`
  query GetCorps($pagination: Pagination, $filter: CorpsFilter, $sorts: [Sort!]) {
    getCorps(pagination: $pagination, filter: $filter, sorts: $sorts) {
      name
      armies {
        name
      }
      commander {
        ...MilitaryBrief
      }
      units {
        name
      }
    }
  }
`

export const GET_CORPS_COUNT = gql`
  query GetCorpsCount($filter: CorpsFilter) {
    getCorpsCount(filter: $filter)
  }
`

export const GET_ONE_CORPS = gql`
  query GetOneCorps($name: String!) {
    getOneCorps(name: $name) {
      name
      armies {
        name
      }
      commander {
        ...MilitaryBrief
      }
      units {
        name
      }
    }
  }
`

export const CREATE_CORPS = gql`
  mutation CreateCorps($input: CorpsInput!) {
    createCorps(input: $input) {
      name
    }
  }
`

export const UPDATE_CORPS = gql`
  mutation UpdateCorps($name: String!, $input: CorpsInput!) {
    updateCorps(name: $name, input: $input) {
      name
    }
  }
`

export const DELETE_CORPS = gql`
  mutation DeleteCorps($name: String!) {
    deleteCorps(name: $name)
  }
`

// ARMIES

export const GET_ALL_ARMY_NAMES = gql`
  query GetAllArmyNames {
    getArmies {
      name
    }
  }
`

export const GET_ARMIES = gql`
  query GetArmies($pagination: Pagination, $filter: ArmyFilter, $sorts: [Sort!]) {
    getArmies(pagination: $pagination, filter: $filter, sorts: $sorts) {
      name
      commander {
        ...MilitaryBrief
      }
      brigades {
        name
      }
      corps {
        name
      }
      divisions {
        name
      }
    }
  }
`

export const GET_ARMY_COUNT = gql`
  query GetArmyCount($filter: ArmyFilter) {
    getArmyCount(filter: $filter)
  }
`

export const GET_ARMY = gql`
  query GetArmy($name: String!) {
    getArmy(name: $name) {
      name
      commander {
        ...MilitaryBrief
      }
      brigades {
        name
      }
      corps {
        name
      }
      divisions {
        name
      }
    }
  }
`

export const CREATE_ARMY = gql`
  mutation CreateArmy($input: ArmyInput!) {
    createArmy(input: $input) {
      name
    }
  }
`

export const UPDATE_ARMY = gql`
  mutation UpdateArmy($name: String!, $input: ArmyInput!) {
    updateArmy(name: $name, input: $input) {
      name
    }
  }
`

export const DELETE_ARMY = gql`
  mutation DeleteArmy($name: String!) {
    deleteArmy(name: $name)
  }
`
