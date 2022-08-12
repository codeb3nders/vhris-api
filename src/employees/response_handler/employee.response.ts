import { LeaveRequestResponseHandler } from 'src/leave_requests/response_handler/leave_request.response';
import { Employee } from '../entities/employee.entity';
import { EmployeeI } from '../interface/employee.interface';

export const EmployeeResponseHandler = {
  ok: (data: Employee[]) => {
    return data.map((item: any) => {
      return returnItem(item);
    });
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
  const toReturn: EmployeeI = {
    employeeNo: item.employeeNo,
    firstName: item.firstName,
    lastName: item.lastName,
    middleName: item.middleName,
    suffix: item.suffix,
    citizenship: item.citizenship,
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
    age: getAge(item.birthDate),
    personalContactNumber: item.personalContactNumber,
    companyContactNumber: item.companyContactNumber,
    taxExemption: item.taxExemption,
    companyEmail: item.companyEmail,
    personalEmail: item.personalEmail,
    payrollBankAccount: item.payrollBankAccount,
    civilStatus: item.civilStatus,
    religion: item.religion,
    NumberOfDependents: item.NumberOfDependents,
    sss: item.sss,
    philHealth: item.philHealth,
    pagIbig: item.pagIbig,
    tin: item.tin,
    presentCity: item.presentCity,
    permanentCity: item.permanentCity,
    presentZipCode: item.presentZipCode,
    permanentZipCode: item.permanentZipCode,
    presentRegion: item.presentRegion,
    permanentRegion: item.permanentRegion,
    permanentResidenceAddress: item.permanentResidenceAddress,
    presentResidenceAddress: item.presentResidenceAddress,
    highestEducationalAttainment: item.highestEducationalAttainment,
    elementaryYrFrom: item.elementaryYrFrom,
    elementaryYrTo: item.elementaryYrTo,
    elementarySchoolAndAddress: item.elementarySchoolAndAddress,
    elementaryHonors: item.elementaryHonors,
    secondaryYrFrom: item.secondaryYrFrom,
    secondaryYrTo: item.secondaryYrTo,
    secondarySchoolAndAddress: item.secondarySchoolAndAddress,
    secondaryHonors: item.secondaryHonors,
    tertiaryYrFrom: item.tertiaryYrFrom,
    tertiaryYrTo: item.tertiaryYrTo,
    tertiarySchoolAndAddress: item.tertiarySchoolAndAddress,
    tertiaryDegree: item.tertiaryDegree,
    tertiaryHonors: item.tertiaryHonors,
    postGradYrFrom: item.postGradYrFrom,
    postGradYrTo: item.postGradYrTo,
    postGradSchoolAndAddress: item.postGradSchoolAndAddress,
    postGradDegree: item.postGradDegree,
    postGradHonors: item.postGradHonors,
    othersYrFrom: item.othersYrFrom,
    othersYrTo: item.othersYrTo,
    othersSchoolAndAddress: item.othersSchoolAndAddress,
    othersDegree: item.othersDegree,
    othersHonors: item.othersHonors,
    licensure: item.licensure,
    emergencyContact: item.emergencyContact,
    employmentRecords: item.employmentRecords,
    govtProfExamsPassed: item.govtProfExamsPassed,
    licensesCertifications: item.licensesCertifications,
    familyBackground: item.familyBackground,
    leave_requests: item.leave_requests,
  };
  if (leaveRequests) {
    toReturn.leave_requests = leaveRequests;
  }
  return toReturn;
}

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
