import { UserWithRoleAndPermissionList } from "@modules/Account/dtos/UserWithRoleAndPermissionList";
import { IUserRepository } from "@modules/Account/repositories/IUserRepository";

type ListUsersResponse = UserWithRoleAndPermissionList

export class GetAllUsers {
  constructor(private usersRepository: IUserRepository) { }
  
  async execute({ skip, take }): Promise<ListUsersResponse> {
    
    const users = this.usersRepository.findAll(Number(skip), Number(take))

    return users
  }
}