import { decode } from 'jsonwebtoken'

import { fail, forbidden, HttpResponse, ok } from '@core/infra/HttpResponse'
import { Middleware } from '@core/infra/Middleware'

import { AccessDeniedError } from '../errors/AccessDeniedError'

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string
  authorization: string
}

type DecodedJwt = {
  sub: string
}

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { authorization } = request
      
      
      const acessToken = authorization.split(' ')[1]

      if (acessToken) {
        try {
          const decoded = decode(acessToken) as DecodedJwt
          return ok({ userId: decoded.sub })
        } catch (err) {
          return forbidden(new AccessDeniedError())
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      return fail(error)
    }
  }
}
/*
export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}*/