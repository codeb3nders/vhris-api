import { CreateLeaveBalanceDto } from 'src/leave_balances/dto/create-leave_balance.dto';
import { BaseResponseHandler } from './base_handler.response';

export class LeaveBalanceResponseHandler extends BaseResponseHandler {
  ok(data: CreateLeaveBalanceDto | CreateLeaveBalanceDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }

  private items = (item: any) => {
    const toReturn: any = {
      id: item.id,
      timestamp: item.timestamp,
      employeeNo: item.employeeNo,
      leaveType: item.leaveType,
      leaveBalance: item.leaveBalance,
      leaveTaken: item.leaveTaken,
      leaveRemaining: item.leaveRemaining,
      dateUpdated: item.dateUpdated,
      employeeDetails: item.employeeDetails,
    };

    return toReturn;
  };
}
