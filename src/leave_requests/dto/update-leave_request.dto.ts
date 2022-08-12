import { PartialType } from '@nestjs/swagger';
import { CreateLeaveRequestDto } from './create-leave_request.dto';

export class UpdateLeaveRequestDto extends PartialType(CreateLeaveRequestDto) {}
