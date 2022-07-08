import { PartialType } from '@nestjs/swagger';
import { CreateLeaveTypeDto } from './create-leave_type.dto';

export class UpdateLeaveTypeDto extends PartialType(CreateLeaveTypeDto) {}
