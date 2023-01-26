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
      VL: item.VL,
      VLTaken: item.VLTaken,
      VLRemaining: item.VLRemaining,
      SL: item.SL,
      SLTaken: item.SLTaken,
      SLRemaining: item.SLRemaining,
      BL: item.BL,
      BLTaken: item.BLTaken,
      BLRemaining: item.BLRemaining,
      CL: item.CL,
      CLTaken: item.CLTaken,
      CLRemaining: item.CLRemaining,
      ML: item.ML,
      MLTaken: item.MLTaken,
      MLRemaining: item.MLRemaining,
      PL: item.PL,
      PLTaken: item.PLTaken,
      PLRemaining: item.PLRemaining,
      SIL: item.SIL,
      SILTaken: item.SILTaken,
      SILRemaining: item.SILRemaining,
      UL: item.UL,
      ULTaken: item.ULTaken,
      ULRemaining: item.ULRemaining,
      dateUpdated: item.dateUpdated,
      employeeDetails: item.employeeDetails,
    };

    return toReturn;
  };
}
