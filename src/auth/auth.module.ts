import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserCredentialsModule } from 'src/user_credentials/user_credentials.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { localStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { EmployeesModule } from 'src/employees/employees.module';
import { EmployeesResponseHandler } from 'src/_utils/response_handler/employees_handler.response';

@Module({
  imports: [
    EmployeesModule,
    UserCredentialsModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
      }),
    }),
  ],
  providers: [
    AuthService,
    localStrategy,
    JwtStrategy,
    EmployeesResponseHandler,
  ],
  exports: [AuthService],
})
export class AuthModule {}
