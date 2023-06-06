import { Controller } from "@core/infra/Controller";
import { CompareFieldsValidator } from "@infra/validation/CompareFieldsValidator";
import { ValidatorCompositor } from "@infra/validation/Compositor";
import { PrismaUsersRepository } from "@modules/Account/repositories/prisma/PrismaUserRepository";
import { RegisterUser } from "@modules/Account/useCases/RegisterUser/RegisterUser";
import { RegisterUserController } from "@modules/Account/useCases/RegisterUser/RegisterUserController";

export function makeRegisterUserController(): Controller {
  const prismaUserRepository = new PrismaUsersRepository();
  const registerUser = new RegisterUser(prismaUserRepository)

  const validator = new ValidatorCompositor([
    new CompareFieldsValidator('password', 'password_confirmation')
  ])

  const registerUserController = new RegisterUserController(validator, registerUser)

  return registerUserController
}