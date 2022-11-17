import { PartialType } from '@nestjs/swagger';
import { CreateTimeKeepingDto } from './create-time_keeping.dto';

export class UpdateTimeKeepingDto extends PartialType(CreateTimeKeepingDto) {}
