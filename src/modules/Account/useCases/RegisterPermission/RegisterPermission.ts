import { Either, left, right } from "@core/logic/Either";
import { Description } from "@modules/Account/domain/permission/description";
import { Name } from "@modules/Account/domain/permission/name";
import { Permission } from "@modules/Account/domain/permission/permission";
import { InvalidDescriptionError } from "@modules/Account/errors/InvalidDescriptionError";
import { InvalidNameError } from "@modules/Account/errors/InvalidNameError";
import { IPermissionRepository } from "@modules/Account/repositories/IPermissionRepository";
import { PermissionAlreadyExistsError } from "./errors/permissionAlreadyExistsError";

type RegisterPermissionResponse = Either<
  | InvalidNameError
  | InvalidDescriptionError,
  Permission
  >

export class RegisterPermission {
  constructor(private permissionRepository: IPermissionRepository) { }
  
  async execute({  name, description }): Promise<RegisterPermissionResponse> {
    const nameOrError = Name.create(name)
    const descriptionOrError = Description.create(description)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value)
    }

    const permissionOrError = Permission.create({
      name: nameOrError.value,
      description: descriptionOrError.value
    })

    if (permissionOrError.isLeft()) {
      return left(permissionOrError.value)
    }

    const permissio = permissionOrError.value

    const permissioAlreadyExists = await this.permissionRepository.exists(permissio.name.value)

    if (permissioAlreadyExists) {
      return left(new PermissionAlreadyExistsError(permissio.name.value))
    }

    await this.permissionRepository.create(permissio)

    return right(permissio)
  }
}