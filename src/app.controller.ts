import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt.auth.guard';

import { LocalAuthGuard } from './auth/local.auth.guard';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,

    private configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Get()
  healthCheck(): string {
    // TODO: require an Bearer token, validate token
    return this.appService.healthCheck();
  }
}
