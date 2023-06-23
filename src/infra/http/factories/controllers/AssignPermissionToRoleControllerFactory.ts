import { Controller } from "@core/infra/Controller";
import { PrismaPermissionRepository } from "@modules/Account/repositories/prisma/PrismaPermissionRepository";
import { PrismaPermissionRoleRepository } from "@modules/Account/repositories/prisma/PrismaPermissionRoleRepository";
import { PrismaRoleRepository } from "@modules/Account/repositories/prisma/PrismaRoleRepository";
import { AssignPermissionToRole } from "@modules/Account/useCases/AssignPermissionToRole/AssignPermissionToRole";
import { AssignPermissionToRoleController } from "@modules/Account/useCases/AssignPermissionToRole/AssignPermissionToRoleController";

export function makeAssignPermissionToRoleController(): Controller {
  const prismaPermissionRoleRepository = new PrismaPermissionRoleRepository()
  const prismaPermissionRepository = new PrismaPermissionRepository()
  const prismaRoleRepository = new PrismaRoleRepository()

  const assignPermissionToRole = new AssignPermissionToRole(
    prismaRoleRepository,
    prismaPermissionRepository,
    prismaPermissionRoleRepository
  )

  const assignPermissionToRoleController = new AssignPermissionToRoleController(
    assignPermissionToRole
  )

  return assignPermissionToRoleController
}