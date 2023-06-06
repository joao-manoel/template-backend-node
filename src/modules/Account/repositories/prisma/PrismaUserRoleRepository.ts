import { prisma } from "@infra/prisma/client";
import { UserRole } from "@modules/Account/domain/UserRole/userRole";
import { IUserRoleRepository } from "../IUserRoleRepository";

export class PrismaUserRoleRepository implements IUserRoleRepository{
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
  
  create(userRole: UserRole): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}