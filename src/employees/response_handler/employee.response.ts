import { LeaveRequestResponseHandler } from 'src/leave_requests/response_handler/leave_request.response';
import { Employee } from '../entities/employee.entity';

export const EmployeeResponseHandler = {
  ok: (data: Employee[]) => {
    if (data.length > 0) {
      return data.map((item: any) => {
        return returnItem(item);
      });
    } else {
      return returnItem(data);
    }
  },
};

export const ResponseHandler = {
  ok: (data: Employee) => {
    return returnItem(data);
  },
};

function returnItem(item) {
  const leaveRequests = item.leave_requests
    ? LeaveRequestResponseHandler.ok(item.leave_requests)
    : null;
  const toReturn: any = {
    employeeNo: item.employeeNo,
    isActive: item.isActive,
    userGroup: item.userGroup,
    firstName: item.firstName,
    lastName: item.lastName,
    middleName: item.middleName,
    suffix: item.suffix,
    birthDate: item.birthDate,
    age: getAge(item.birthDate),
    gender: item.gender,
    civilStatus: item.civilStatus,
    citizenship: item.citizenship,
    religion: item.religion,
    personalContactNumber: item.personalContactNumber,
    personalEmail: item.personalEmail,
    presentAddress: item.presentAddress,
    educationalBackground: item.educationalBackground,
    employmentRecords: item.employmentRecords,
    govtProfExamsPassed: item.govtProfExamsPassed,
    licensesCertifications: item.licensesCertifications,
    familyBackground: item.familyBackground,
    emergencyContact: item.emergencyContact,
    companyContactNumber: item.companyContactNumber,
    companyEmail: item.companyEmail,
    position: item.position,
    department: prepareEnumItem(item.departmentEnum),
    location: item.locationEnum && prepareEnumItem(item.locationEnum, true),
    reportsTo: item.reportingTo && getReportToDetails(item.reportingTo[0]),
    dateHired: item.dateHired,
    dateInactive: item.dateInactive,
    yearsInSerVice: getYearsInService(item.dateHired, item.dateInactive),
    endOfProbationary: item.endOfProbationary,
    contractEndDate: item.contractEndDate,
    rank: item.rank,
    employmentType: prepareEnumItem(item.employmentTypeEnum),
    employmentStatus: prepareEnumItem(item.employmentStatusEnum),
    sss: item.sss,
    philHealth: item.philHealth,
    pagIbig: item.pagIbig,
    tin: item.tin,
    NumberOfDependents: item.NumberOfDependents,
    taxExemption: item.taxExemption,
    basicPay: item.basicPay,
    payRateType: item.payRateType,
    paymentMethod: item.paymentMethod,
    payrollGroup: item.payrollGroup,
    deductionSSS: item.deductionSSS,
    deductPhilhealth: item.deductPhilhealth,
    deductHMDF: item.deductHMDF,
    fixedContributionRate: item.fixedContributionRate,
    deductWithholdingTax: item.deductWithholdingTax,
    allowanceDetails: item.allowanceDetails,
    payrollBankAccount: item.payrollBankAccount,
  };
  if (leaveRequests) {
    toReturn.leave_requests = leaveRequests;
  }
  return toReturn;
}

const prepareEnumItem = (item: any, isArray = false) => {
  if (isArray) {
    return item &&
      item.map((i: any) => {
        return { code: i.code, name: i.name };
      })
  } else {
    const data = item &&
      item.map((i: any) => {
        return { code: i.code, name: i.name };
      });
    return data[0];
  }
};

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getYearsInService(dateHiredTmp: Date, inActiveDate?: Date | null) {
  const endDate = inActiveDate ? new Date(inActiveDate) : new Date();
  const dateHired = new Date(dateHiredTmp);
  var yearsInService = endDate.getFullYear() - dateHired.getFullYear();
  var m = endDate.getMonth() - dateHired.getMonth();
  if (m < 0 || (m === 0 && endDate.getDate() < dateHired.getDate())) {
    yearsInService--;
  }
  return yearsInService;
}

function getReportToDetails(items: any) {
  return {
    employeeNo: items.employeeNo,
    employeeName: `${items.firstName} ${items.lastName}`,
    position: items.position,
  };
}
