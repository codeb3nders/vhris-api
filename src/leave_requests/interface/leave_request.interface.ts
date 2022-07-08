import { EmployeeI } from "src/employees/interface/employee.interface";

interface LeaveRequestI {
  leaveRequestNo: string;
  employeeNo: string;
  timestamp: string;
  leaveApplied: string;
  otHoursOffset: string;
  dateToOffsetFrom: string;
  dateToOffsetTo: string;
  dateTimeLeaveFirst: string;
  dateTimeLeaveLast: string;
  leaveDays: string;
  returnToWorkDate: string;
  reason: string;
  itineraryFrom: string;
  itineraryTo: string;
  purpose: string;
  dateTimeDeparture: string;
  dateTimeArrival: string;
  information: string;
  immediateSupervisor: string;
  status: string;
  disapprovalReason: string;
  approvedDate: string;
  disapprovedDate: string;
  employee?: EmployeeI
}

export { LeaveRequestI };
