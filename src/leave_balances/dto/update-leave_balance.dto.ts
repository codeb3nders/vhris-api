import { PartialType } from '@nestjs/swagger';
import { CreateLeaveBalanceDto } from './create-leave_balance.dto';

export class UpdateLeaveBalanceDto extends PartialType(CreateLeaveBalanceDto) {}
