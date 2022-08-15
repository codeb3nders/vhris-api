import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeHistoryDto } from './create-employee_history.dto';

export class UpdateEmployeeHistoryDto extends PartialType(
  CreateEmployeeHistoryDto,
) {}
