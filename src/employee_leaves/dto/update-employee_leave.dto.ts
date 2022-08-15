import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeLeaveDto } from './create-employee_leave.dto';

export class UpdateEmployeeLeaveDto extends PartialType(
  CreateEmployeeLeaveDto,
) {}
