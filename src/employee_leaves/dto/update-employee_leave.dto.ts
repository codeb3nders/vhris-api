import { PartialType } from '@nestjs/swagger';
import { createEmployeeLeaveDto } from './create-employee_leave.dto';

export class UpdateEmployeeleaveDto extends PartialType(createEmployeeLeaveDto) {}
