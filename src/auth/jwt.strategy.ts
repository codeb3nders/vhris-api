import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET', //  TODO: get from env var
    });
  }

  async validate(payload: any) {
    // TODO: get user from db
    // const user = await this.userCredential.getById(payload.sub)
    return {
      id: payload.sub,
      name: payload.name,
    };
  }
}
