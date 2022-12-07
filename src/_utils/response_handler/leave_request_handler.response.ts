import { LeaveRequest } from 'src/leave_requests/entities/leave_request.entity';
import { BaseResponseHandler } from './base_handler.response';

export class LeaveRequestResponseHandler extends BaseResponseHandler {
  ok(data: LeaveRequest | LeaveRequest[]) {
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
      employeeNo: item.employeeNo,
      leaveType: item.leaveType,
      offsetOThrs: item.offsetOThrs,
      dateFrom: item.dateFrom,
      dateTo: item.dateTo,
      noOfDays: item.noOfDays,
      dateOfReturnToWork: item.dateOfReturnToWork,
      reasonOfLeave: item.reasonOfLeave,
      status: item.status,
      approver: item.approver,
      leaveReasonOfDisapproval: item.leaveReasonOfDisapproval,
      dateTimeApproved: item.dateTimeApproved,
      approvedBy: item.approvedBy,
      lastModifiedDate: item.lastModifiedDate,
      employeeDetails:
        item.employeeDetails.length > 0 ? item.employeeDetails[0] : null,
      approverDetails: item.approverDetails[0],
    };

    return toReturn;
  };
}
