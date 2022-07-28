import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserCredentialsModule } from 'src/user_credentials/user_credentials.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { localStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserCredentialsModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET', // TODO: to put in env variables
      signOptions: { expiresIn: '60S' }, // TODO: put in config
    }),
  ],
  providers: [AuthService, localStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
