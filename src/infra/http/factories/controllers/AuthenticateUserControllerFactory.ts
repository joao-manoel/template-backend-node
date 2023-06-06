import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/Account/repositories/prisma/PrismaUserRepository";
import { AuthenticateUser } from "@modules/Account/useCases/AuthenticateUser/AuthenticateUser";
import { AuthenticateUserController } from "@modules/Account/useCases/AuthenticateUser/AuthenticateUserController";

export function makeAuthenticateUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUser = new AuthenticateUser(prismaUsersRepository)
  const authenticateUserController = new AuthenticateUserController(authenticateUser)

  return authenticateUserController
}