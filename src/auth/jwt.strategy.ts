import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly employeesService: EmployeesService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET', //  TODO: get from env var
    });
  }

  async validate(payload: any) {
    // TODO: what to do with this fetched user data
    const user = await this.employeesService.findOne(payload.employeeNo);
    console.log('PAYLOAD', payload, user);
    return {
      isActive: payload.isActive,
      accessGroup: payload.accessGroup,
    };
  }
}
