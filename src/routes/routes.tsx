import type { TFunction } from 'i18next'

import { ReactNode } from 'react'

import { LoginPage } from '../pages/LoginPage.tsx'
import { MainPage } from '../pages/MainPage.tsx'
import { CombatEquipmentInstanceAndTypeListPage } from '../pages/equipment/CombatEquipmentInstanceAndTypeListPage.tsx'
import { CombatEquipmentCreatePage } from '../pages/equipment/instance/CombatEquipmentCreatePage.tsx'
import { CombatEquipmentUpdatePage } from '../pages/equipment/instance/CombatEquipmentUpdatePage.tsx'
import { CombatEquipmentTypeCreatePage } from '../pages/equipment/type/CombatEquipmentTypeCreatePage.tsx'
import { CombatEquipmentTypeUpdatePage } from '../pages/equipment/type/CombatEquipmentTypeUpdatePage.tsx'
import { FormationListPage } from '../pages/formation/FormationListPage.tsx'
import { ArmyCreatePage } from '../pages/formation/army/ArmyCreatePage.tsx'
import { ArmyUpdatePage } from '../pages/formation/army/ArmyUpdatePage.tsx'
import { BrigadeCreatePage } from '../pages/formation/brigade/BrigadeCreatePage.tsx'
import { BrigadeUpdatePage } from '../pages/formation/brigade/BrigadeUpdatePage.tsx'
import { CompanyCreatePage } from '../pages/formation/company/CompanyCreatePage.tsx'
import { CorpsCreatePage } from '../pages/formation/corps/CorpsCreatePage.tsx'
import { CorpsUpdatePage } from '../pages/formation/corps/CorpsUpdatePage.tsx'
import { DivisionCreatePage } from '../pages/formation/division/DivisionCreatePage.tsx'
import { DivisionUpdatePage } from '../pages/formation/division/DivisionUpdatePage.tsx'
import { PlatoonCreatePage } from '../pages/formation/platoon/PlatoonCreatePage.tsx'
import { PlatoonUpdatePage } from '../pages/formation/platoon/PlatoonUpdatePage.tsx'
import { SquadCreatePage } from '../pages/formation/squad/SquadCreatePage.tsx'
import { SquadUpdatePage } from '../pages/formation/squad/SquadUpdatePage.tsx'
import { UnitCreatePage } from '../pages/formation/unit/UnitCreatePage.tsx'
import { UnitUpdatePage } from '../pages/formation/unit/UnitUpdatePage.tsx'
import { BuildingCreatePage } from '../pages/infrastructure/BuildingCreatePage.tsx'
import { BuildingListPage } from '../pages/infrastructure/BuildingListPage.tsx'
import { BuildingUpdatePage } from '../pages/infrastructure/BuildingUpdatePage.tsx'
import { MilitaryCreatePage } from '../pages/military/MilitaryCreatePage.tsx'
import { MilitaryListPage } from '../pages/military/MilitaryListPage.tsx'
import { MilitaryUpdatePage } from '../pages/military/MilitaryUpdatePage.tsx'
import { ReportBuildPage } from '../pages/report/ReportBuildPage.tsx'
import { ReportListPage } from '../pages/report/ReportListPage.tsx'
import { WeaponInstanceAndTypeListPage } from '../pages/weapon/WeaponInstanceAndTypeListPage.tsx'
import { WeaponCreatePage } from '../pages/weapon/instance/WeaponCreatePage.tsx'
import { WeaponUpdatePage } from '../pages/weapon/instance/WeaponUpdatePage.tsx'
import { WeaponTypeCreatePage } from '../pages/weapon/type/WeaponTypeCreatePage.tsx'
import { WeaponTypeUpdatePage } from '../pages/weapon/type/WeaponTypeUpdatePage.tsx'

interface RouteProps {
  page: ReactNode
  path: string
  title: string
}

interface PrivateRouteProps extends RouteProps {
  privileges: string[]
}

export function useUnauthenticatedRoutes(t: TFunction): RouteProps[] {
  return [
    {
      page: <LoginPage />,
      path: '/login',
      title: t('doLogin'),
    },
  ]
}

export function usePrivateRoutes(t: TFunction): PrivateRouteProps[] {
  return [
    {
      page: <MainPage />,
      path: '/',
      privileges: [],
      title: '',
    },
    {
      page: <MilitaryListPage />,
      path: '/militaries',
      privileges: ['READ_MILITARIES'],
      title: t('militaryList'),
    },
    {
      page: <MilitaryCreatePage />,
      path: '/militaries/new',
      privileges: ['WRITE_MILITARIES'],
      title: t('militaryCreate'),
    },
    {
      page: <MilitaryUpdatePage />,
      path: '/militaries/update',
      privileges: ['READ_MILITARIES', 'WRITE_MILITARIES'],
      title: t('militaryUpdate'),
    },
    {
      page: <FormationListPage />,
      path: '/formation',
      privileges: ['READ_FORMATIONS'],
      title: t('formationList'),
    },
    {
      page: <UnitCreatePage />,
      path: '/formation/units/new',
      privileges: ['WRITE_FORMATIONS'],
      title: t('unitCreate'),
    },
    {
      page: <UnitUpdatePage />,
      path: '/formation/units/update',
      privileges: ['READ_FORMATIONS', 'WRITE_FORMATIONS'],
      title: t('unitUpdate'),
    },
    {
      page: <SquadCreatePage />,
      path: '/formation/squads/new',
      privileges: ['WRITE_FORMATIONS'],
      title: t('squadCreate'),
    },
    {
      page: <SquadUpdatePage />,
      path: '/formation/squads/update',
      privileges: ['READ_FORMATIONS', 'WRITE_FORMATIONS'],
      title: t('squadUpdate'),
    },
    {
      page: <PlatoonCreatePage />,
      path: '/formation/platoons/new',
      privileges: ['WRITE_FORMATIONS'],
      title: t('platoonCreate'),
    },
    {
      page: <PlatoonUpdatePage />,
      path: '/formation/platoons/update',
      privileges: ['READ_FORMATIONS', 'WRITE_FORMATIONS'],
      title: t('platoonUpdate'),
    },
    {
      page: <CompanyCreatePage />,
      path: '/formation/companies/new',
      privileges: ['WRITE_FORMATIONS'],
      title: t('companyCreate'),
    },
    {
      page: <CompanyCreatePage />,
      path: '/formation/companies/update',
      privileges: ['READ_FORMATIONS', 'WRITE_FORMATIONS'],
      title: t('companyUpdate'),
    },
    {
      page: <BrigadeCreatePage />,
      path: '/formation/brigades/new',
      privileges: ['WRITE_FORMATIONS'],
      title: t('brigadeCreate'),
    },
    {
      page: <BrigadeUpdatePage />,
      path: '/formation/brigades/update',
      privileges: ['READ_FORMATIONS', 'WRITE_FORMATIONS'],
      title: t('brigadeUpdate'),
    },
    {
      page: <CorpsCreatePage />,
      path: '/formation/corps/new',
      privileges: ['WRITE_FORMATIONS'],
      title: t('corpsCreate'),
    },
    {
      page: <CorpsUpdatePage />,
      path: '/formation/corps/update',
      privileges: ['READ_FORMATIONS', 'WRITE_FORMATIONS'],
      title: t('corpsUpdate'),
    },
    {
      page: <DivisionCreatePage />,
      path: '/formation/divisions/new',
      privileges: ['WRITE_FORMATIONS'],
      title: t('divisionCreate'),
    },
    {
      page: <DivisionUpdatePage />,
      path: '/formation/divisions/update',
      privileges: ['READ_FORMATIONS', 'WRITE_FORMATIONS'],
      title: t('divisionUpdate'),
    },
    {
      page: <ArmyCreatePage />,
      path: '/formation/armies/new',
      privileges: ['WRITE_FORMATIONS'],
      title: t('armyCreate'),
    },
    {
      page: <ArmyUpdatePage />,
      path: '/formation/armies/update',
      privileges: ['READ_FORMATIONS', 'WRITE_FORMATIONS'],
      title: t('armyUpdate'),
    },
    {
      page: <CombatEquipmentInstanceAndTypeListPage />,
      path: '/equipments',
      privileges: ['READ_EQUIPMENTS'],
      title: t('equipmentList'),
    },
    {
      page: <CombatEquipmentCreatePage />,
      path: '/equipments/instances/new',
      privileges: ['WRITE_EQUIPMENTS'],
      title: t('equipmentInstanceCreate'),
    },
    {
      page: <CombatEquipmentUpdatePage />,
      path: '/equipments/instances/update',
      privileges: ['READ_EQUIPMENTS', 'WRITE_EQUIPMENTS'],
      title: t('equipmentInstanceUpdate'),
    },
    {
      page: <CombatEquipmentTypeCreatePage />,
      path: '/equipments/types/new',
      privileges: ['WRITE_EQUIPMENTS'],
      title: t('equipmentTypeCreate'),
    },
    {
      page: <CombatEquipmentTypeUpdatePage />,
      path: '/equipments/types/update',
      privileges: ['READ_EQUIPMENTS', 'WRITE_EQUIPMENTS'],
      title: t('equipmentTypeUpdate'),
    },
    {
      page: <WeaponInstanceAndTypeListPage />,
      path: '/weapons',
      privileges: ['READ_WEAPONS'],
      title: t('weaponList'),
    },
    {
      page: <WeaponCreatePage />,
      path: '/weapons/instances/new',
      privileges: ['WRITE_WEAPONS'],
      title: t('weaponInstanceCreate'),
    },
    {
      page: <WeaponUpdatePage />,
      path: '/weapons/instances/update',
      privileges: ['READ_WEAPONS', 'WRITE_WEAPONS'],
      title: t('weaponInstanceUpdate'),
    },
    {
      page: <WeaponTypeCreatePage />,
      path: '/weapons/types/new',
      privileges: ['WRITE_WEAPONS'],
      title: t('weaponTypeCreate'),
    },
    {
      page: <WeaponTypeUpdatePage />,
      path: '/weapons/types/update',
      privileges: ['READ_WEAPONS', 'WRITE_WEAPONS'],
      title: t('weaponTypeUpdate'),
    },
    {
      page: <BuildingListPage />,
      path: '/infrastructures',
      privileges: ['READ_INFRASTRUCTURES'],
      title: t('buildingList'),
    },
    {
      page: <BuildingCreatePage />,
      path: '/buildings/new',
      privileges: ['WRITE_INFRASTRUCTURES'],
      title: t('buildingCreate'),
    },
    {
      page: <BuildingUpdatePage />,
      path: '/buildings/update',
      privileges: ['READ_INFRASTRUCTURES', 'WRITE_INFRASTRUCTURES'],
      title: t('buildingUpdate'),
    },
    {
      page: <ReportListPage />,
      path: '/reports',
      privileges: ['VIEW_REPORTS'],
      title: t('reportList'),
    },
    {
      page: <ReportBuildPage />,
      path: '/reports/build',
      privileges: ['VIEW_REPORTS', 'BUILD_REPORT'],
      title: t('reportBuild'),
    },
  ]
}
