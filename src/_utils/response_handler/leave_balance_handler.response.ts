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
      SL: item.SL,
      SLTaken: item.SLTaken,
      BL: item.BL,
      BLTaken: item.BLTaken,
      CL: item.CL,
      CLTaken: item.CLTaken,
      ML: item.ML,
      MLTaken: item.MLTaken,
      PL: item.PL,
      PLTaken: item.PLTaken,
      SIL: item.SIL,
      SILTaken: item.SILTaken,
      UL: item.UL,
      ULTaken: item.ULTaken,
      dateUpdated: item.dateUpdated,
      employeeDetails: item.employeeDetails,
    };

    return toReturn;
  };
}
