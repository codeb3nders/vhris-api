import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsEmail, IsEmpty, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  EmployeeEnum,
  RankEnum,
  DepartmentsEnum,
  LocationsEnum,
  UserGroupEnum,
  EmploymentStatusEnum,
  CivilStatusEnum,
} from 'src/enums/employee.enum';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  @IsEnum(EmployeeEnum)
  @Transform((param) => param.value.toUpperCase())
  position: EmployeeEnum;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  @IsEnum(RankEnum)
  @Transform((param) => param.value.toUpperCase())
  rank: RankEnum;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  @IsEnum(DepartmentsEnum)
  @Transform((param) => param.value.toUpperCase())
  department: DepartmentsEnum;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  @IsEnum(LocationsEnum)
  @Transform((param) => param.value.toUpperCase())
  location: LocationsEnum;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  isActive: boolean;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  @IsEnum(UserGroupEnum)
  @Transform((param) => param.value.toUpperCase())
  userGroup: UserGroupEnum;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty()
  reportsTo: string;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  dateHired: Date;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  @IsEnum(EmploymentStatusEnum)
  @Transform((param) => param.value.toUpperCase())
  employmentStatus: EmploymentStatusEnum;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty()
  endOfProbationary: Date;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty()
  contractEndDate: Date;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  @IsEmail()
  companyEmail: string;

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty()
  payrollBankAccount: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankBranch: string;
  };

  @IsEmpty({ message: 'Not Allowed to Edit!' })
  @ApiProperty({ required: true })
  @IsEnum(CivilStatusEnum)
  @Transform((param) => param.value.toUpperCase())
  civilStatus: CivilStatusEnum;
}
