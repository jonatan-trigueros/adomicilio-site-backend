/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true; // No necesita autenticación
    }

    return super.canActivate(context); // Protegido con JWT
  }
}

// Esta clase extiende AuthGuard de Passport para usar la estrategia JWT
// y proporciona la funcionalidad de autenticación JWT en los controladores de NestJS.  