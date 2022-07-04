import { LeaveRequestResponseHandler } from 'src/leave_requests/response_handler/leave_request.response';
import { Employee } from '../entities/employee.entity';
import { EmployeeI } from '../interface/employee.interface';

export const EmployeeResponseHandler = {
  ok: (data: Employee[]) => {
    return data.map((item: any) => {
      const leaveRequests = item.leave_requests
        ? LeaveRequestResponseHandler.ok(item.leave_requests)
        : null;
      const toReturn: EmployeeI = {
        employeeNo: item.employeeNo,
        firstName: item.firstName,
        lastName: item.lastName,
        middleName: item.middleName,
        fsCode: item.fsCode,
        bioCode: item.bioCode,
        position: item.position,
        rank: item.rank,
        division: item.division,
        department: item.department,
        designation: item.designation,
        dateHired: item.dateHired,
        yearsInService: item.yearsInService,
        employmentStatus: item.employmentStatus,
        endOfProbationary: item.endOfProbationary,
        contractEndDate: item.contractEndDate,
        gender: item.gender,
        birthDate: item.birthDate,
        age: item.age,
        contactNumber: item.contactNumber,
        taxExemption: item.taxExemption,
        email: item.email,
        backAccountNo: item.backAccountNo,
        civilStatus: item.civilStatus,
        NumberOfDependents: item.NumberOfDependents,
        sss: item.sss,
        philHealth: item.philHealth,
        pagIbig: item.pagIbig,
        tin: item.tin,
        address: item.address,
        course: item.course,
        educationalAttainment: item.educationalAttainment,
        schoolAttended: item.schoolAttended,
        licensure: item.licensure,
        prcIdNo: item.prcIdNo,
        noticeOffense: item.noticeOffense,
        audit201: item.audit201,
        remarks: item.remarks,
        cocNo: item.cocNo,
        vaccineStatus: item.vaccineStatus,
        digitalBulletin: item.digitalBulletin,
        viberNumber: item.viberNumber,
        vpdcEmail: item.vpdcEmail,
        emergencyContactPerson: item.emergencyContactPerson,
        emergencyAddress: item.emergencyAddress,
        emergencyContactNo: item.emergencyContactNo,
      };
      if (leaveRequests) {
        toReturn.leave_requests = leaveRequests;
      }
      return toReturn;
    });
  },
};
