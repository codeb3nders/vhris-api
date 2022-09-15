import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly employeesService: EmployeesService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET, //  TODO: get from env var
    });
  }

  async validate(payload: any) {
    return {
      isActive: payload.isActive,
      accessGroup: payload.accessGroup,
      xxx: this.configService.get('SECRET'),
    };
  }
}
