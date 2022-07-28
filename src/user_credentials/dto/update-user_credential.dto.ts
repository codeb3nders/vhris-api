import { PartialType } from '@nestjs/swagger';
import { CreateUserCredentialDto } from './create-user_credential.dto';

export class UpdateUserCredentialDto extends PartialType(
  CreateUserCredentialDto,
) {}
