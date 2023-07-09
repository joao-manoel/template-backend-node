import { Either, left, right } from "@core/logic/Either";
import { UserNotFoundError } from "@modules/Account/errors/UserNotFoundError";
import { IUserRepository } from "@modules/Account/repositories/IUserRepository";

type SessionResponse = {
  username: string,
  email: string,
  roles?: {
    name: string
    description: string
    permissions: {
      name: string
      description: string
    }[]
  }[]
}

type SessionUserResponse = Either<Error, SessionResponse>

export class Session{  

  constructor(private userRepository: IUserRepository){}

  async execute(userId: string): Promise<SessionUserResponse>{
    
    const user = await this.userRepository.findByIdWithRoleAndPermission(userId)

    if (!user) return left(new UserNotFoundError())
    
    
    return right({
      username: user.username,
      email: user.email,
      roles: user.roles
    })
  }
}