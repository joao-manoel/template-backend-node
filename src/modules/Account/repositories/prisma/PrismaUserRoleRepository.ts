import { prisma } from "@infra/prisma/client";
import { UserRole } from "@modules/Account/domain/UserRole/userRole";
import { UserRoleMapper } from "@modules/Account/mappers/userRoleMapper";
import { IUserRoleRepository } from "../IUserRoleRepository";

export class PrismaUserRoleRepository implements IUserRoleRepository{

  async exists(userId: string, roleId: string): Promise<boolean>{
    const userRoleExists = await prisma.roleUser.findUnique({
      where: {
        roleId_userId: {
          roleId,
          userId
        }
      }
    })

    return !!userRoleExists
  }

  async UserRoleExists(names: string[], userId: string): Promise<boolean> {
    //Verifique se o usuario possui algum dos cargos requeridos
    const userRoles = await prisma.roleUser.findMany({
      where: {
        userId,
        role: {
          name: {in: names}
        }
      }
    })
    
    return userRoles.length >= 1 ? true: false
  }
  
  async create(userRole: UserRole): Promise<void> {
    const data = await UserRoleMapper.toPersistence(userRole)

    await prisma.roleUser.create({data})
  }
  
}