import { gql } from '@apollo/client'

// INSTANCES

export const GET_COMBAT_EQUIPMENTS = gql`
  query GetCombatEquipments($filter: CombatEquipmentFilter, $pagination: Pagination, $sorts: [Sort!]) {
    getCombatEquipments(filter: $filter, pagination: $pagination, sorts: $sorts) {
      serialNumber
      unit {
        name
      }
      type {
        name
        category {
          name
        }
      }
    }
  }
`

export const GET_COMBAT_EQUIPMENT_COUNT = gql`
  query GetCombatEquipmentCount($filter: CombatEquipmentFilter) {
    getCombatEquipmentCount(filter: $filter)
  }
`

export const GET_COMBAT_EQUIPMENT = gql`
  query GetCombatEquipment($serialNumber: String!) {
    getCombatEquipment(serialNumber: $serialNumber) {
      serialNumber
      unit {
        name
      }
      type {
        name
        category {
          name
        }
      }
    }
  }
`

export const CREATE_COMBAT_EQUIPMENT = gql`
  mutation CreateCombatEquipment($input: CombatEquipmentInput!) {
    createCombatEquipment(input: $input) {
      serialNumber
      unit {
        name
      }
      type {
        name
        category {
          name
        }
      }
    }
  }
`

export const UPDATE_COMBAT_EQUIPMENT = gql`
  mutation UpdateCombatEquipment($input: CombatEquipmentInput!, $serialNumber: String!) {
    updateCombatEquipment(input: $input, serialNumber: $serialNumber) {
      serialNumber
      unit {
        name
      }
      type {
        name
        category {
          name
        }
      }
    }
  }
`

export const DELETE_COMBAT_EQUIPMENT = gql`
  mutation DeleteCombatEquipment($serialNumber: String!) {
    deleteCombatEquipment(serialNumber: $serialNumber)
  }
`

// TYPES

export const GET_COMBAT_EQUIPMENT_TYPES = gql`
  query GetCombatEquipmentTypes($filter: CombatEquipmentTypeFilter, $pagination: Pagination, $sorts: [Sort!]) {
    getCombatEquipmentTypes(filter: $filter, pagination: $pagination, sorts: $sorts) {
      name
      category {
        name
      }
    }
  }
`

export const GET_COMBAT_EQUIPMENT_TYPE_COUNT = gql`
  query GetCombatEquipmentTypeCount($filter: CombatEquipmentTypeFilter) {
    getCombatEquipmentTypeCount(filter: $filter)
  }
`

export const GET_COMBAT_EQUIPMENT_TYPE = gql`
  query GetCombatEquipmentType($category: String!, $name: String!) {
    getCombatEquipmentType(category: $category, name: $name) {
      name
      category {
        name
      }
      attributes {
        name
        value
      }
    }
  }
`

export const CREATE_COMBAT_EQUIPMENT_TYPE = gql`
  mutation CreateCombatEquipmentType($input: CombatEquipmentTypeInput!) {
    createCombatEquipmentType(input: $input) {
      category {
        name
      }
      name
      attributes {
        name
        value
      }
    }
  }
`

export const UPDATE_COMBAT_EQUIPMENT_TYPE = gql`
  mutation UpdateCombatEquipmentType($category: String!, $input: CombatEquipmentTypeInput!, $name: String!) {
    updateCombatEquipmentType(category: $category, input: $input, name: $name) {
      attributes {
        name
        value
      }
      category {
        name
      }
      id
      name
    }
  }
`

export const DELETE_COMBAT_EQUIPMENT_TYPE = gql`
  mutation DeleteCombatEquipmentType($category: String!, $name: String!) {
    deleteCombatEquipmentType(category: $category, name: $name)
  }
`

// CATEGORY

export const GET_COMBAT_EQUIPMENT_CATEGORIES = gql`
  query GetCombatEquipmentCategories($pagination: Pagination, $sorts: [Sort!]) {
    getCombatEquipmentCategories(pagination: $pagination, sorts: $sorts) {
      name
    }
  }
`
