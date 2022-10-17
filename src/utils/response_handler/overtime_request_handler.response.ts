import { CreateOvertimeRequestDto } from 'src/overtime_requests/dto/create-overtime_request.dto';
import { BaseResponseHandler } from './base_handler.response';

export class OvertimeRequestResponseHandler extends BaseResponseHandler {
  ok(data: CreateOvertimeRequestDto | CreateOvertimeRequestDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }
  private items = (item: any) => {
    const employee = item.employee;
    const toReturn: any = {
      overtimeRequestNo: item.overtimeRequestNo,
      dateTimeFrom: item.dateTimeFrom,
      dateTimeTo: item.dateTimeTo,
      isEarlyOt: item.isEarlyOt,
      reason: item.reason,
      isLessBreak: item.isLessBreak,
      isPlusDay: item.isPlusDay,
      otStatus: item.otStatus,
      isApprove: item.isApprove,
      date: item.date,
      disapprovalReason: item.disapprovalReason,
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
