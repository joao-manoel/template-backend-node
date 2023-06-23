import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from '@modules/Account/repositories/prisma/PrismaUserRepository';
import { GetAllUsers } from "@modules/Account/useCases/GetAllUsers/GetAllUsers";
import { GetAllUsersController } from "@modules/Account/useCases/GetAllUsers/GetAllUsersController";

export function makeGetUsersController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getAllUsers = new GetAllUsers(prismaUsersRepository)
  const getAllUserController = new GetAllUsersController(getAllUsers)

  return getAllUserController
}