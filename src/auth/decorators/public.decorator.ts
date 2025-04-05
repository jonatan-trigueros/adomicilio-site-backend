/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
// Este decorador se utiliza para marcar rutas públicas que no requieren autenticación.
// Se utiliza junto con el guardia JwtAuthGuard para omitir la verificación de JWT en ciertas rutas.
