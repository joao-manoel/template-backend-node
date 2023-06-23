import { prisma } from "@infra/prisma/client";
import { PermissionRole } from "@modules/Account/domain/PermissionRole/permissionRole";
import { PermissionRoleMapper } from "@modules/Account/mappers/permissionRoleMapper";
import { IPermissionRoleRepository } from "../IPermissionRoleRepository";

export class PrismaPermissionRoleRepository implements IPermissionRoleRepository{

  async exists(permissionId: string, roleId: string): Promise<boolean>{
    const permissionRoleExist = await prisma.permissionRole.findUnique({
      where: {
        roleId_permissionId: {
          permissionId,
          roleId
        }
      }
    })

    return !!permissionRoleExist
  }

  async PermissionRoleExists(permissionNames: string[], roleId: string): Promise<boolean> {
    //Verifique se o usuario possui algum dos cargos requeridos
    const permissionRoles = await prisma.permissionRole.findMany({
      where: {
        roleId,
        permission: {
          name: {in: permissionNames}
        }
      }
    })
    
    return permissionRoles.length >= 1 ? true: false
  }
  
  async create(permissionRole: PermissionRole): Promise<void> {
    const data = await PermissionRoleMapper.toPersistence(permissionRole)

    await prisma.permissionRole.create({data})
  }
  
}