import { PartialType } from '@nestjs/swagger';
import { CreateUserLogDto } from './create-user_log.dto';

export class UpdateUserLogDto extends PartialType(CreateUserLogDto) {}
