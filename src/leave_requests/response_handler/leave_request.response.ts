import { EmployeeResponseHandler } from 'src/employees/response_handler/employee.response';
import { Leave_request } from '../entities/leave_request.entity';

export const LeaveRequestResponseHandler = {
  ok: (data: Leave_request[]) => {
    return data.map((item: any) => {
      const employee = item.employee
        ? EmployeeResponseHandler.ok(item.employee)
        : null;

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
    });
  },
};
