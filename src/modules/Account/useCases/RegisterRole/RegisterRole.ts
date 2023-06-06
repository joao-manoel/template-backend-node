import { Either, left, right } from "@core/logic/Either";
import { Description } from "@modules/Account/domain/role/description";
import { Name } from "@modules/Account/domain/role/name";
import { Role } from "@modules/Account/domain/role/role";
import { InvalidDescriptionError } from "@modules/Account/errors/InvalidDescriptionError";
import { InvalidNameError } from "@modules/Account/errors/InvalidNameError";
import { IRoleRepository } from "@modules/Account/repositories/IRoleRepository";
import { RoleAlreadyExistsError } from "./errors/roleAlreadyExistsError";

type RegisterRoleResponse = Either<
  | InvalidNameError
  | InvalidDescriptionError,
  Role
  >

export class RegisterRole {
  constructor(private roleRepository: IRoleRepository) { }
  
  async execute({  name, description }): Promise<RegisterRoleResponse> {
    const nameOrError = Name.create(name)
    const descriptionOrError = Description.create(description)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value)
    }

    const roleOrError = Role.create({
      name: nameOrError.value,
      description: descriptionOrError.value
    })

    if (roleOrError.isLeft()) {
      return left(roleOrError.value)
    }

    const role = roleOrError.value

    const roleAlreadyExists = await this.roleRepository.exists(role.name.value)

    if (roleAlreadyExists) {
      return left(new RoleAlreadyExistsError(role.name.value))
    }

    await this.roleRepository.create(role)

    return right(role)
  }
}