import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEmpty } from 'class-validator';
import { CreateUserCredentialDto } from './create-user_credential.dto';

export class ChangePasswordDto extends PartialType(CreateUserCredentialDto) {
  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
}
