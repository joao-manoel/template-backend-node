import { prisma } from "@infra/prisma/client";
import { Permission } from "@modules/Account/domain/permission/permission";
import { PermissionMapper } from "@modules/Account/mappers/permissionMapper";
import { IPermissionRepository } from "../IPermissionRepository";

export class PrismaPermissionRepository implements IPermissionRepository{
  async exists(name: string): Promise<boolean> {
    const permissionExists = await prisma.permission.findUnique({
      where: {name}
    })

    return !!permissionExists
  }

  async findById(id: string): Promise<Permission> {
    const permission = await prisma.permission.findFirst({
      where: {
        id
      }
    })

    if (!permission) {
      return null
    }

    return PermissionMapper.toDomain(permission)
  }

  async save(permission: Permission): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async create(permission: Permission): Promise<void> {
    const data = await PermissionMapper.toPersistence(permission)

    await prisma.permission.create({data})
  }

}