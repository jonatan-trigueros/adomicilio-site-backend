/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Asegúrate de definir JWT_SECRET en las variables de entorno
        });
    }

    async validate(payload: JwtPayload) {
        if (!payload) {
            throw new Error('Invalid JWT payload');
        }
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}
