import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCredentialsService } from './user_credentials.service';
import { CreateUserCredentialDto } from './dto/create-user_credential.dto';
import { UpdateUserCredentialDto } from './dto/update-user_credential.dto';

@Controller('user-credentials')
export class UserCredentialsController {
  constructor(
    private readonly userCredentialsService: UserCredentialsService,
  ) {}

  @Post()
  create(@Body() createUserCredentialDto: CreateUserCredentialDto) {
    return this.userCredentialsService.create(createUserCredentialDto);
  }

  @Get()
  findAll() {
    return this.userCredentialsService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userCredentialsService.findOne(username);
  }

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserCredentialDto: UpdateUserCredentialDto,
  ) {
    return this.userCredentialsService.update(
      username,
      updateUserCredentialDto,
    );
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userCredentialsService.remove(username);
  }
}
