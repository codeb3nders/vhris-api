import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ required: true })
  employeeNo: string;
  @ApiProperty({ required: true })
  firstName: string;
  @ApiProperty({ required: true })
  lastName: string;
  @ApiProperty()
  middleName: string;
  @ApiProperty({ required: true })
  position: string;
  @ApiProperty({ required: true })
  rank: string;
  @ApiProperty({ required: true })
  department: string;
  @ApiProperty({ required: true })
  location: string;
  @ApiProperty({ required: true })
  isActive: boolean;
  @ApiProperty({ required: true })
  userGroup: string;
  @ApiProperty()
  reportsTo: string;
  @ApiProperty({ required: true })
  dateHired: Date;
  @ApiProperty({ required: true })
  employmentStatus: string;
  @ApiProperty()
  endOfProbationary: Date;
  @ApiProperty()
  contractEndDate: Date;
  @ApiProperty({ required: true })
  gender: string;
  @ApiProperty({ required: true })
  birthDate: Date;
  @ApiProperty({ required: true })
  contactNumber: string;
  @ApiProperty({ required: true })
  taxExemption: string;
  @ApiProperty({ required: true })
  companyEmail: string;
  @ApiProperty({ required: true })
  personalEmail: string;
  @ApiProperty({ required: true })
  backAccountNo: string;
  @ApiProperty({ required: true })
  civilStatus: string;
  @ApiProperty()
  religion: string;
  @ApiProperty()
  NumberOfDependents: number;
  @ApiProperty()
  sss: string;
  @ApiProperty()
  philHealth: string;
  @ApiProperty()
  pagIbig?: string;
  @ApiProperty()
  tin: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  zipCode: string;
  @ApiProperty()
  region: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  course?: string;
  @ApiProperty()
  educationalAttainment?: string;
  @ApiProperty()
  schoolAttended?: string;
  @ApiProperty()
  licensure: string;
  @ApiProperty()
  prcIdNo: string;
  @ApiProperty()
  audit201: string;
  @ApiProperty()
  notes: string;
  @ApiProperty()
  cocNo: string;
  @ApiProperty()
  vpdcEmail: string;
  @ApiProperty({ required: true })
  emergencyContactPerson: string;
  @ApiProperty({ required: true })
  emergencyAddress: string;
  @ApiProperty({ required: true })
  emergencyContactNo: string;
}
