import { Employee } from 'src/employees/entities/employee.entity';
import { BaseResponseHandler } from './base_handler.response';

export class EmployeesResponseHandler extends BaseResponseHandler {
  ok(data: Employee | Employee[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }
  private items = (item: any) => {
    console.log('-----', item.religionEnum);
    return {
      isActive: item.isActive,
      userGroup: this.prepareEnumItem(item.userGroupEnum),
      firstName: item.firstName,
      lastName: item.lastName,
      middleName: item.middleName,
      suffix: item.suffix,
      birthDate: item.birthDate,
      age: item.age,
      gender: this.prepareEnumItem(item.genderEnum),
      civilStatus: this.prepareEnumItem(item.civilStatusEnum),
      citizenship: this.prepareEnumItem(item.citizenshipEnum),
      religion: this.prepareEnumItem(item.religionEnum),
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
      position: this.prepareEnumItem(item.positionEnum),
      department: this.prepareEnumItem(item.departmentEnum),
      location: this.prepareEnumItem(item.locationEnum, true),
      reportsTo: this.getReportToDetails(item.reportingTo),
      dateHired: item.dateHired,
      dateInactive: item.dateInactive,
      yearsInService: item.yearsInService,
      endOfProbationary: item.endOfProbationary,
      contractEndDate: item.contractEndDate,
      rank: this.prepareEnumItem(item.rankEnum),
      employmentType: this.prepareEnumItem(item.employmentTypeEnum),
      employmentStatus: this.prepareEnumItem(item.employmentStatusEnum),
      sss: item.sss,
      philHealth: item.philHealth,
      pagIbig: item.pagIbig,
      tin: item.tin,
      numberOfDependents: item.numberOfDependents,
      taxExemption: item.taxExemption,
      basicPay: item.basicPay,
      payRateType: this.prepareEnumItem(item.payRateTypeEnum),
      paymentMethod: this.prepareEnumItem(item.paymentMethodEnum),
      payrollGroup: this.prepareEnumItem(item.payrollGroupEnum),
      employeeBenefits: item.employeeBenefits,
      deductionSSS: item.deductionSSS,
      deductPhilhealth: this.prepareEnumItem(item.deductPhilhealthEnum),
      deductHMDF: item.deductHMDF,
      fixedContributionRate: this.prepareEnumItem(
        item.fixedContributionRateEnum,
      ),
      deductWithholdingTax: item.deductWithholdingTax,
      allowanceDetails: item.allowanceDetails,
      payrollBankAccount: item.payrollBankAccount,
      bday: item.bday,

      employmentLastUpdate: item.employmentLastUpdate,
      jobLastUpdate: item.jobLastUpdate,
      dateCreated: item.dateCreated,
      lastModifiedDate: item.lastModifiedDate,
    };
  };
}
