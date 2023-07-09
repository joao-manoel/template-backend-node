import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/Account/repositories/prisma/PrismaUserRepository";
import { Session } from "@modules/Account/useCases/Session/Session";
import { SessionController } from "@modules/Account/useCases/Session/SessionController";

export function makeSessionController(): Controller {
  const userRepository = new PrismaUsersRepository()
  const session = new Session(userRepository)
  const sessionController = new SessionController(session)

  return sessionController
}