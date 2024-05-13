import { gql } from '@apollo/client'

// INSTANCES

export const GET_WEAPONS = gql`
  query GetWeapons($filter: WeaponFilter, $pagination: Pagination, $sorts: [Sort!]) {
    getWeapons(filter: $filter, pagination: $pagination, sorts: $sorts) {
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

export const GET_WEAPON_COUNT = gql`
  query GetWeaponCount($filter: WeaponFilter) {
    getWeaponCount(filter: $filter)
  }
`

export const GET_WEAPON = gql`
  query GetWeapon($serialNumber: String!) {
    getWeapon(serialNumber: $serialNumber) {
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

export const CREATE_WEAPON = gql`
  mutation CreateWeapon($input: WeaponInput!) {
    createWeapon(input: $input) {
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

export const UPDATE_WEAPON = gql`
  mutation UpdateWeapon($input: WeaponInput!, $serialNumber: String!) {
    updateWeapon(input: $input, serialNumber: $serialNumber) {
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

export const DELETE_WEAPON = gql`
  mutation DeleteWeapon($serialNumber: String!) {
    deleteWeapon(serialNumber: $serialNumber)
  }
`

// TYPES

export const GET_WEAPON_TYPES = gql`
  query GetWeaponTypes($filter: WeaponTypeFilter, $pagination: Pagination, $sorts: [Sort!]) {
    getWeaponTypes(filter: $filter, pagination: $pagination, sorts: $sorts) {
      name
      category {
        name
      }
    }
  }
`

export const GET_WEAPON_TYPE_COUNT = gql`
  query GetWeaponTypeCount($filter: WeaponTypeFilter) {
    getWeaponTypeCount(filter: $filter)
  }
`

export const GET_WEAPON_TYPE = gql`
  query GetWeaponType($category: String!, $name: String!) {
    getWeaponType(category: $category, name: $name) {
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

export const CREATE_WEAPON_TYPE = gql`
  mutation CreateWeaponType($input: WeaponTypeInput!) {
    createWeaponType(input: $input) {
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

export const UPDATE_WEAPON_TYPE = gql`
  mutation UpdateWeaponType($category: String!, $input: WeaponTypeInput!, $name: String!) {
    updateWeaponType(category: $category, input: $input, name: $name) {
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

export const DELETE_WEAPON_TYPE = gql`
  mutation DeleteWeaponType($category: String!, $name: String!) {
    deleteWeaponType(category: $category, name: $name)
  }
`

// CATEGORY

export const GET_WEAPON_CATEGORIES = gql`
  query GetWeaponCategories($pagination: Pagination, $sorts: [Sort!]) {
    getWeaponCategories(pagination: $pagination, sorts: $sorts) {
      name
    }
  }
`
