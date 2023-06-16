import { prisma } from "@infra/prisma/client";
import { Role } from "@modules/Account/domain/role/role";
import { RoleMapper } from "@modules/Account/mappers/roleMapper";
import { IRoleRepository } from "../IRoleRepository";

export class PrismaRoleRepository implements IRoleRepository{
  async exists(name: string): Promise<boolean> {
    const roleExists = await prisma.role.findUnique({
      where: {name}
    })

    return !!roleExists
  }

  async findById(id: string): Promise<Role> {
    const role = await prisma.role.findFirst({
      where: {
        id
      }
    })

    if (!role) {
      return null
    }

    return RoleMapper.toDomain(role)
  }

  save(role: Role): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(role: Role): Promise<void> {
    const data = await RoleMapper.toPersistence(role)

    await prisma.role.create({data})
  }  
}