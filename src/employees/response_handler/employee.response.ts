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
  const leaveRequests = item.leave_requests;
  const employeeLeaves = item.employee_leaves;

  const toReturn: any = {
    employeeNo: item.employeeNo,
    isActive: item.isActive,
    userGroup: prepareEnumItem(item.userGroupEnum),
    firstName: item.firstName,
    lastName: item.lastName,
    middleName: item.middleName,
    suffix: item.suffix,
    birthDate: item.birthDate,
    age: item.age,
    gender: prepareEnumItem(item.genderEnum),
    civilStatus: prepareEnumItem(item.civilStatusEnum),
    citizenship: prepareEnumItem(item.citizenshipEnum),
    religion: prepareEnumItem(item.religionEnum),
    personalContactNumber: item.personalContactNumber,
    personalEmail: item.personalEmail,
    presentAddress: item.presentAddress,
    permanentAddress: item.permanentAddress,
    educationalBackground: item.educationalBackground,
    employmentRecords: item.employmentRecords,
    govtProfExamsPassed: item.govtProfExamsPassed,
    licensesCertifications: item.licensesCertifications,
    familyBackground: item.familyBackground,
    emergencyContact: item.emergencyContact,
    companyContactNumber: item.companyContactNumber,
    companyEmail: item.companyEmail,
    position: prepareEnumItem(item.positionEnum),
    department: prepareEnumItem(item.departmentEnum),
    location: prepareEnumItem(item.locationEnum, true),
    reportsTo: getReportToDetails(item.reportingTo),
    dateHired: item.dateHired,
    dateInactive: item.dateInactive,
    yearsInService: item.yearsInService,
    endOfProbationary: item.endOfProbationary,
    contractEndDate: item.contractEndDate,
    rank: prepareEnumItem(item.rankEnum),
    employmentType: prepareEnumItem(item.employmentTypeEnum),
    employmentStatus: prepareEnumItem(item.employmentStatusEnum),
    sss: item.sss,
    philHealth: item.philHealth,
    pagIbig: item.pagIbig,
    tin: item.tin,
    numberOfDependents: item.numberOfDependents,
    taxExemption: item.taxExemption,
    basicPay: item.basicPay,
    payRateType: prepareEnumItem(item.payRateTypeEnum),
    paymentMethod: prepareEnumItem(item.paymentMethodEnum),
    payrollGroup: prepareEnumItem(item.payrollGroupEnum),
    employeeBenefits: item.employeeBenefits,
    deductionSSS: item.deductionSSS,
    deductPhilhealth: prepareEnumItem(item.deductPhilhealthEnum),
    deductHMDF: item.deductHMDF,
    fixedContributionRate: prepareEnumItem(item.fixedContributionRateEnum),
    deductWithholdingTax: item.deductWithholdingTax,
    allowanceDetails: item.allowanceDetails,
    payrollBankAccount: item.payrollBankAccount,
    bday: item.bday,

    employmentLastUpdate: item.employmentLastUpdate,
    jobLastUpdate: item.jobLastUpdate,
    dateCreated: item.dateCreated,
    lastModifiedDate: item.lastModifiedDate,
  };
  if (leaveRequests) {
    toReturn.leave_requests = leaveRequests;
  }
  if (employeeLeaves) {
    toReturn.employee_leaves = employeeLeaves;
  }
  return toReturn;
}

const prepareEnumItem = (item: any, isArray = false) => {
  if (!item || item.length < 1) return null;
  if (isArray) {
    return (
      item &&
      item.map((i: any) => {
        return { code: i.code, name: i.name };
      })
    );
  } else {
    const data =
      item &&
      item.map((i: any) => {
        return { code: i.code, name: i.name };
      });
    return data[0];
  }
};

function getReportToDetails(items: any) {
  if (!items || items.length < 1) {
    return null;
  }

  let item;
  if (Array.isArray(items)) {
    item = items[0];
  } else {
    item = items;
  }
  return {
    ...item,
    employeeName: `${item.firstName} ${item.lastName}`,
  };
}
