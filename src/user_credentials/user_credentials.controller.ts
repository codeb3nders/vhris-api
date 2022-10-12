import { isNil } from 'lodash';
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
import { ErrorResponse } from 'src/helpers/error_response';
import { ChangePasswordDto } from './dto/change-password.dto';
import { comparePassword } from 'src/utils/encoder';

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

  @Get('forgot-password/:employeeNo')
  async forgotPassword(@Param('employeeNo') employeeNo: string) {
    try {
      return await this.userCredentialsService.forgotPassword(employeeNo);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Patch('validate-code/:employeeNo/:code')
  async validateCode(
    @Param() params: { employeeNo: string; code: string },
    @Body() updateUserCredentialDto: UpdateUserCredentialDto,
  ) {
    const { employeeNo, code } = params;

    try {
      const result = await this.userCredentialsService.validateCode(
        employeeNo,
        code,
      );

      if (!isNil(result)) {
        const res: any = await this.userCredentialsService.update(
          employeeNo,
          updateUserCredentialDto,
        );
        return res.acknowledged;
      }
      return false;
    } catch (error) {
      return error.message || error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password/:employeeNo')
  async changePassword(
    @Param('employeeNo') employeeNo: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    // check old password

    const user: any = await this.userCredentialsService.findOne(employeeNo);
    if (!user) ErrorResponse.badRequest('user not found');

    const isMatch = await comparePassword(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!isMatch) ErrorResponse.badRequest('Old Password is not correct');
    changePasswordDto.password = changePasswordDto.newPassword;
    delete changePasswordDto.newPassword;
    delete changePasswordDto.oldPassword;

    return await this.userCredentialsService.update(
      employeeNo,
      changePasswordDto,
    );
  }
}
