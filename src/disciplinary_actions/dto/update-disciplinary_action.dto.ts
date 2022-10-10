import { PartialType } from '@nestjs/swagger';
import { CreateDisciplinaryActionDto } from './create-disciplinary_action.dto';

export class UpdateDisciplinaryActionDto extends PartialType(
  CreateDisciplinaryActionDto,
) {}
