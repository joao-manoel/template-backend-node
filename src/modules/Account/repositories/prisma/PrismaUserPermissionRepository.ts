import { prisma } from "@infra/prisma/client";
import { UserPermission } from "@modules/Account/domain/UserPermission/userPermission";
import { UserPermissionMapper } from "@modules/Account/mappers/userPermissionMapper";
import { IUserPermissionRepository } from "../IUserPermissionRepository";

export class PrismaUserPermissionRepository implements IUserPermissionRepository{
  async exists(names: string[], userId: string): Promise<boolean> {
    //Verifique se o usuario possui algum dos cargos requeridos
    const userRoles = await prisma.user_role.findMany({
      where: {
        userId,
        role: {
          name: {in: names}
        }
      }
    })
    
    return userRoles.length >= 1 ? true: false
  }
  
  async create(userPermission: UserPermission): Promise<void> {
    const data = await UserPermissionMapper.toPersistence(userPermission)

    await prisma.user_permission.create({data})
  }
  
}