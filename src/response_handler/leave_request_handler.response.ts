import { CreateLeaveRequestDto } from 'src/leave_requests/dto/create-leave_request.dto';
import { BaseResponseHandler } from './base_handler.response';

export class LeaveRequestResponseHandler extends BaseResponseHandler {
  ok(data: CreateLeaveRequestDto | CreateLeaveRequestDto[]) {
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
      leaveRequestNo: item.leaveRequestNo,
      employeeNo: item.employeeNo,
      timestamp: item.timestamp,
      leaveApplied: item.leaveApplied,
      otHoursOffset: item.otHoursOffset,
      dateToOffsetFrom: item.dateToOffsetFrom,
      dateToOffsetTo: item.dateToOffsetTo,
      dateTimeLeaveFirst: item.dateTimeLeaveFirst,
      dateTimeLeaveLast: item.dateTimeLeaveLast,
      leaveDays: item.leaveDays,
      returnToWorkDate: item.returnToWorkDate,
      reason: item.reason,
      itineraryFrom: item.itineraryFrom,
      itineraryTo: item.itineraryTo,
      purpose: item.purpose,
      dateTimeDeparture: item.dateTimeDeparture,
      dateTimeArrival: item.dateTimeArrival,
      information: item.information,
      immediateSupervisor: item.immediateSupervisor,
      status: item.status,
      disapprovalReason: item.disapprovalReason,
      approvedDate: item.approvedDate,
      disapprovedDate: item.disapprovedDate,
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
