import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserCredentialsService } from './user_credentials.service';
import { CreateUserCredentialDto } from './dto/create-user_credential.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UpdateUserCredentialDto } from './dto/update-user_credential.dto';
import { UserCredentialResponseHandler } from 'src/response_handler/user_credential_handler.response';

@Controller('user-credentials')
export class UserCredentialsController {
  constructor(
    private readonly userCredentialsService: UserCredentialsService,
    private readonly userCredentialResponseHandler: UserCredentialResponseHandler,
  ) {}

  @Post()
  create(@Body() createUserCredentialDto: CreateUserCredentialDto) {
    return this.userCredentialsService.create(createUserCredentialDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<CreateUserCredentialDto[]> {
    const response = await this.userCredentialsService.findAll();
    return this.userCredentialResponseHandler.ok(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':employeeNo')
  async findOne(@Param('employeeNo') employeeNo: string) {
    const response = await this.userCredentialsService.findOne(employeeNo);
    return this.userCredentialResponseHandler.ok(response);
  }

  @Patch(':employeeNo')
  async update(
    @Param('employeeNo') employeeNo: string,
    @Body() updateUserCredentialDto: UpdateUserCredentialDto,
  ) {
    return await this.userCredentialsService.update(
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
