import { Either, left, right } from "@core/logic/Either";
import { JWT } from "@modules/Account/domain/user/jwt";
import { IUserRepository } from "@modules/Account/repositories/IUserRepository";
import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

type TokenResponse = {
  token: string
}

type AuthenticateUserRequest = {
  email: string
  password: string
}

type AuthenticateUserResponse = Either<InvalidEmailOrPasswordError, TokenResponse >

export class AuthenticateUser {
  constructor(private usersRepository: IUserRepository) { }
  
  async execute({email, password}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) return left(new InvalidEmailOrPasswordError())
    
    const isPasswordValid = await user.password.comparePassword(password)

    if (!isPasswordValid) return left(new InvalidEmailOrPasswordError())
    
    const { token } = JWT.signUser(user)
    
    return right({token})
  }
}