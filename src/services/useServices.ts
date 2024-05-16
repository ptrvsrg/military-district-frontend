import { GraphQlClient } from '../common/clients/GraphQlClient.ts'
import { HttpClient } from '../common/clients/HttpClient.ts'
import { CombatEquipmentCategoryService } from './equipment/CombatEquipmentCategoryService.ts'
import { CombatEquipmentService } from './equipment/CombatEquipmentService.ts'
import { CombatEquipmentTypeService } from './equipment/CombatEquipmentTypeService.ts'
import { ArmyService } from './formation/ArmyService.ts'
import { BrigadeService } from './formation/BrigadeService.ts'
import { CompanyService } from './formation/CompanyService.ts'
import { CorpsService } from './formation/CorpsService.ts'
import { DivisionService } from './formation/DivisionService.ts'
import { PlatoonService } from './formation/PlatoonService.ts'
import { SquadService } from './formation/SquadService.ts'
import { UnitService } from './formation/UnitService.ts'
import { BuildingService } from './infrastructure/BuildingService.ts'
import { MilitaryService } from './military/MilitaryService.ts'
import { RankService } from './military/RankService.ts'
import { SpecialtyService } from './military/SpecialtyService.ts'
import { ReportService } from './report/ReportService.ts'
import { WeaponCategoryService } from './weapon/WeaponCategoryService.ts'
import { WeaponService } from './weapon/WeaponService.ts'
import { WeaponTypeService } from './weapon/WeaponTypeService.ts'

export function useServices() {
  const graphQlClient = GraphQlClient.getInstance()
  const httpClient = HttpClient.getInstance()

  const militaryService = new MilitaryService(graphQlClient)
  const rankService = new RankService(graphQlClient)
  const specialtyService = new SpecialtyService(graphQlClient)

  const unitService = new UnitService(graphQlClient)
  const squadService = new SquadService(graphQlClient)
  const platoonService = new PlatoonService(graphQlClient)
  const companyService = new CompanyService(graphQlClient)
  const brigadeService = new BrigadeService(graphQlClient)
  const corpsService = new CorpsService(graphQlClient)
  const divisionService = new DivisionService(graphQlClient)
  const armyService = new ArmyService(graphQlClient)

  const buildingService = new BuildingService(graphQlClient)

  const combatEquipmentService = new CombatEquipmentService(graphQlClient)
  const combatEquipmentTypeService = new CombatEquipmentTypeService(graphQlClient)
  const combatEquipmentCategoryService = new CombatEquipmentCategoryService(graphQlClient)

  const weaponService = new WeaponService(graphQlClient)
  const weaponTypeService = new WeaponTypeService(graphQlClient)
  const weaponCategoryService = new WeaponCategoryService(graphQlClient)

  const reportService = new ReportService(httpClient)

  return {
    armyService,
    brigadeService,
    buildingService,
    combatEquipmentCategoryService,
    combatEquipmentService,
    combatEquipmentTypeService,
    companyService,
    corpsService,
    divisionService,
    militaryService,
    platoonService,
    rankService,
    reportService,
    specialtyService,
    squadService,
    unitService,
    weaponCategoryService,
    weaponService,
    weaponTypeService,
  }
}
