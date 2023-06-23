import { Controller } from "@core/infra/Controller";
import { PrismaRoleRepository } from "@modules/Account/repositories/prisma/PrismaRoleRepository";
import { PrismaUsersRepository } from "@modules/Account/repositories/prisma/PrismaUserRepository";
import { PrismaUserRoleRepository } from "@modules/Account/repositories/prisma/PrismaUserRoleRepository";
import { PromoteUser } from "@modules/Account/useCases/PromoteUser/PromoteUser";
import { PromoteUserController } from "@modules/Account/useCases/PromoteUser/PromoteUserController";

export function makePromoteUserController(): Controller {
  const prismaUserRoleRepository = new PrismaUserRoleRepository()
  const prismaUserRepository = new PrismaUsersRepository()
  const prismaRoleRepository = new PrismaRoleRepository()
  const promoteUser = new PromoteUser(prismaUserRoleRepository, prismaRoleRepository, prismaUserRepository)
  const promoteUserController = new PromoteUserController(promoteUser)

  return promoteUserController
}