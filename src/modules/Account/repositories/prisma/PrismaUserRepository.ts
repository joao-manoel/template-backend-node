import { prisma } from "@infra/prisma/client";
import { User } from "@modules/Account/domain/user/user";
import { UserWithRoleAndPermission } from "@modules/Account/dtos/UserWithRoleAndPermission";
import { UserWithRoleAndPermissionList } from "@modules/Account/dtos/UserWithRoleAndPermissionList";
import { UserWithRoleAndPermissionListMapper } from "@modules/Account/mappers/UserWithRoleAndPermissionListMapper";
import { UserMapper } from "@modules/Account/mappers/userMapper";
import { IUserRepository } from "../IUserRepository";
import { UserWithRoleAndPermissionMapper } from './../../mappers/UserWithRoleAndPermissionMapper';

export class PrismaUsersRepository implements IUserRepository{

  async findAll(skip: number, take: number): Promise<UserWithRoleAndPermissionList>{
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
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
        },
        skip,
        take
      }),
      prisma.user.count()
    ])

    const totalPage = Math.ceil(total / take)
    return UserWithRoleAndPermissionListMapper.toDto({
      total, totalPage, users
    })
  }

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

  async findByEmailWithRoleAndPermission(email: string): Promise<UserWithRoleAndPermission> {
    const user = await prisma.user.findUnique({
      where: {
        email
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