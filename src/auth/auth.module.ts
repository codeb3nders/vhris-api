import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserCredentialsModule } from 'src/user_credentials/user_credentials.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { localStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    EmployeesModule,
    UserCredentialsModule,
    PassportModule,
    JwtModule.register({
      secret: `SeCR3TK3YF0RAp1`,
      //signOptions: { expiresIn: '60S' }, // TODO: put in config
    }),
  ],
  providers: [AuthService, localStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
