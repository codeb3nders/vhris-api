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
      id: item.id,
      timestamp: item.timestamp,
      employeeNo: item.employeeNo,
      date: item.date,
      timeFrom: item.timeFrom,
      timeTo: item.timeTo,
      earlyOT: item.earlyOT,
      reason: item.reason,
      lessBreak: item.lessBreak,
      plus1day: item.plus1day,
      approver: item.approver,
      status: item.status,
      totalOThrs: item.totalOThrs,
      OTreasonOfDisapproval: item.OTreasonOfDisapproval,
      dateTimeApproved: item.dateTimeApproved,
      approvedBy: item.approvedBy,
      CLid: item.CLid,
      CLapproved: item.CLapproved,
      employeeDetails:
        item.employeeDetails.length > 0 ? item.employeeDetails[0] : null,
      approverDetails:
        item.approverDetails.length >= 1
          ? item.approverDetails[0]
          : item.employeeNo,
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
