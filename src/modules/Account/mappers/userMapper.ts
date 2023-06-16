import { User as PersistenceUser } from '@prisma/client';
import { Password } from './../domain/user/password';

import { Email } from '../domain/user/email';
import { User } from '../domain/user/user';
import { Username } from '../domain/user/username';

export class UserMapper {
  static toDomain(raw: PersistenceUser): User {
    const usernameOrError = Username.create(raw.username)
    const emailOrError = Email.create(raw.email)
    const passwordOrError = Password.create(raw.password, true)

    if (usernameOrError.isLeft()) {
      throw new Error('Username value is invalid.')
    }

    if (emailOrError.isLeft()) {
      throw new Error('Email is invalid.')
    }

    if (passwordOrError.isLeft()) {
      throw new Error('Password value is invalid.')
    }


    const userOrError = User.create(
      {
        username: usernameOrError.value,
        email: emailOrError.value,
        password: passwordOrError.value,
      },      
      raw.id
    )

    if (userOrError.isRight()) {
      return userOrError.value
    }

    return null
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      username: user.username.value,
      email: user.email.value,
      password: await user.password.getHashedValue(),
    }
  }
  
}