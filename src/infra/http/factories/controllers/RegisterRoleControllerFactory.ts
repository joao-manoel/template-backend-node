import { Controller } from "@core/infra/Controller";
import { PrismaRoleRepository } from "@modules/Account/repositories/prisma/PrismaRoleRepository";
import { RegisterRole } from "@modules/Account/useCases/RegisterRole/RegisterRole";
import { RegisterRoleController } from "@modules/Account/useCases/RegisterRole/RegisterRoleController";

export function makeRegisterRoleController(): Controller {
  const prismaRoleRepository = new PrismaRoleRepository()
  const registerRole = new RegisterRole(prismaRoleRepository)

  const registerRoleController = new RegisterRoleController(registerRole)

  return registerRoleController
}