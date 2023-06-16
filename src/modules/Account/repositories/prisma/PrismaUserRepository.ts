import { prisma } from "@infra/prisma/client";
import { User } from "@modules/Account/domain/user/user";
import { UserWithRoleAndPermission } from "@modules/Account/dtos/UserWithRoleAndPermission";
import { UserWithRoleAndPermissionMapper } from "@modules/Account/mappers/UserWithRoleAndPermissionMapper";
import { UserMapper } from "@modules/Account/mappers/userMapper";
import { IUserRepository } from "../IUserRepository";

export class PrismaUsersRepository implements IUserRepository{

  async exists(email: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: {email}
    })

    return !!userExists
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email }
    })


    if (!user) {
      return null
    }

    

    return UserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User> {
  
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      return null
    }
    
    return UserMapper.toDomain(user)
  }

  async findByIdWithRoleAndPermission(id: string): Promise<UserWithRoleAndPermission> {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true
                  }
                }
              }
            }
          }
        }
      }
    })    

    if (!user) return null
    
    return UserWithRoleAndPermissionMapper.toDto(user)
  }

  save(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prisma.user.create({ data })
  }
  
}