import { Controller } from "@core/infra/Controller";
import { PrismaPermissionRepository } from "@modules/Account/repositories/prisma/PrismaPermissionRepository";
import { RegisterPermission } from "@modules/Account/useCases/RegisterPermission/RegisterPermission";
import { RegisterPermissionController } from "@modules/Account/useCases/RegisterPermission/RegisterPermissionController";

export function makeRegisterPermissionController(): Controller {
  const prismaPermissionRepository = new PrismaPermissionRepository()
  const registerPermission = new RegisterPermission(prismaPermissionRepository)

  const registerPermissionController = new RegisterPermissionController(registerPermission)

  return registerPermissionController

}