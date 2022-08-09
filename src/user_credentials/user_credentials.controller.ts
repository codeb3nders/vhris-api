import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserCredentialsService } from './user_credentials.service';
import { CreateUserCredentialDto } from './dto/create-user_credential.dto';
import { UpdateUserCredentialDto } from './dto/update-user_credential.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('user-credentials')
export class UserCredentialsController {
  constructor(
    private readonly userCredentialsService: UserCredentialsService,
  ) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserCredentialDto: CreateUserCredentialDto) {
    return this.userCredentialsService.create(createUserCredentialDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userCredentialsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':employeeNo')
  findOne(@Param('employeeNo') employeeNo: string) {
    return this.userCredentialsService.findOne(employeeNo);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':employeeNo')
  update(
    @Param('employeeNo') employeeNo: string,
    @Body() updateUserCredentialDto: UpdateUserCredentialDto,
  ) {
    return this.userCredentialsService.update(
      employeeNo,
      updateUserCredentialDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':employeeNo')
  remove(@Param('employeeNo') employeeNo: string) {
    return this.userCredentialsService.remove(employeeNo);
  }
}
