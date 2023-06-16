import { HttpResponse, fail, ok, unauthorized } from "@core/infra/HttpResponse";
import { Middleware } from "@core/infra/Middleware";
import { IUserRepository } from "@modules/Account/repositories/IUserRepository";
import { Request } from "express";
import { AccessDeniedError } from "../errors/AccessDeniedError";


export class EnsureAcessControllMiddleware implements Middleware{

  constructor(
    private userRepository: IUserRepository,
    private readonly requiredRoles: string[],
    private readonly requiredPermission: string[],
  ) { }
  
  async handle({userId}: Request): Promise<HttpResponse>{
    try {
      const user = await this.userRepository.findByIdWithRoleAndPermission(userId)

      if (this.requiredRoles) {
        //Verifica se o usuario possui alguma das roles requeridas
        const userRoles = user.roles.filter(role => this.requiredRoles?.includes(role.name));
        if (userRoles.length >= 1) {
          return ok()       
        }
      }

      if (this.requiredPermission) {
        // Verifique se o usuário possui alguma das permissões requeridas
        const userPermissions = user.roles.flatMap(role => role.permissions).map(permission => permission.name)
        const hasRequiredPermissions = this.requiredPermission.every(permission => userPermissions.includes(permission))

        if (hasRequiredPermissions) {
          return ok()
        }
      }
      
      return unauthorized(new AccessDeniedError())
    } catch (err) {
      return fail(err)
    }
  }
  
}

/* 

  [
    {
      name: 'admin',
      description: 'Administrador',
      permissions: [
        { name: 'create_roles', description: 'Criar Cargos' },     
        { name: 'create_new_user', description: 'Criar Usuários' },
        { name: 'delete_user', description: 'Deletar Usuários' }   
      ]
    },
    { name: 'mod', description: 'Moderador', permissions: [] }
  ]
*/