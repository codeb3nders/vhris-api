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
        position: item.position,
        rank: item.rank,
        department: item.department,
        location: item.location,
        isActive: item.isActive,
        userGroup: item.userGroup,
        reportsTo: item.reportsTo,
        dateHired: item.dateHired,
        employmentStatus: item.employmentStatus,
        endOfProbationary: item.endOfProbationary,
        contractEndDate: item.contractEndDate,
        gender: item.gender,
        birthDate: item.birthDate,
        contactNumber: item.contactNumber,
        taxExemption: item.taxExemption,
        companyEmail: item.companyEmail,
        personalEmail: item.personalEmail,
        backAccountNo: item.backAccountNo,
        civilStatus: item.civilStatus,
        religion: item.religion,
        NumberOfDependents: item.NumberOfDependents,
        sss: item.sss,
        philHealth: item.philHealth,
        pagIbig: item.pagIbig,
        tin: item.tin,
        city: item.city,
        zipCode: item.zipCode,
        region: item.region,
        address: item.address,
        course: item.course,
        educationalAttainment: item.educationalAttainment,
        schoolAttended: item.schoolAttended,
        licensure: item.licensure,
        prcIdNo: item.prcIdNo,
        audit201: item.audit201,
        notes: item.notes,
        cocNo: item.cocNo,
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
