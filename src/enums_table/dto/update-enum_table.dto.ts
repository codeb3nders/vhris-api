import { PartialType } from '@nestjs/swagger';
import { CreateEnumTableDto } from './create-enum_table.dto';

export class UpdateEnumTableDto extends PartialType(CreateEnumTableDto) {}
