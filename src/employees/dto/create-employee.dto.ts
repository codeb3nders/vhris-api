import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
    
    @ApiProperty({example:  Date.now()})
    @IsNotEmpty()
    employeeNo: string;
    
    @ApiProperty({example: 'John'} )
    @IsNotEmpty()
    firstName: string;
    
    @ApiProperty({example: "Doe"})
    @IsNotEmpty()
    lastName: string;
    
    @ApiProperty({example: 'Dane'} )
    @IsNotEmpty()
    middleName: string;
    
    @ApiProperty({required:false, example: 'FS-01'})
    fsCode?: string;
    
    @ApiProperty({required:false, example: 'BIO-01'})
    bioCode?: string;
    
    @ApiProperty({required:false, example: 'Manager'})
    position?: string;
    
    @ApiProperty({required:false, example: 'Level 6'})
    rank?: string;
    
    @ApiProperty({required:false, example: 'Division'})
    division?: string;
    
    @ApiProperty({required:false, example: 'Department'})
    department?: string;
    
    @ApiProperty({required:false, example: 'Designation'})
    designation?: string;
    
    @ApiProperty()
    @ApiProperty({required:false, example: '2017/01/01'})
    dateHired?: Date;
    
    @ApiProperty({required:false, example: 2})
    yearsInService?: number;
    
    @ApiProperty({required:false, example: 'Gegular'})
    employmentStatus?: string;
    
    @ApiProperty({required:false, example: '2022/03/03'})
    endOfProbationary?: Date;
    
    @ApiProperty({required:false, example: '2024/01/01'})
    contractEndDate?: Date;
    
    @ApiProperty({example: 'Male'} )
    @IsNotEmpty()
    gender: string;
    
    @ApiProperty({example: new Date()} )
    @IsNotEmpty()
    birthDate: Date;
    
    @ApiProperty({example: 25} )
    @IsNotEmpty()
    age: number;
    
    @ApiProperty({required:false, example: '09399000000'})
    contactNumber?: string;
    
    @ApiProperty({required:false, example: 'Married 2 kids'})
    taxExemption?: string;
    
    @ApiProperty({example: 'test@mail.com'} )
    @IsEmail()
    @ApiProperty()
    email: string;
    
    @ApiProperty({required:false, example: '110000011111'})
    backAccountNo?: string;
    
    @ApiProperty({required:false, example: 'Married'})
    civilStatus?: string;
    
    @ApiProperty({example: 3} )
    NumberOfDependents: number;
    
    @ApiProperty({required:false, example: '12-2224-4455'})
    sss?: string;
    
    @ApiProperty({required:false, example: '33-44-5-555'})
    philHealth?: string;
    
    @ApiProperty({required:false, example: '55-667-7555'})
    pagIbig?: string;
    
    @ApiProperty({required:false, example: '445-566-777'})
    tin?: string;
    
    @ApiProperty({required:false, example: 'Complete address here.'})
    address?: string;
    
    @ApiProperty({required:false, example: 'BSCS'})
    course?: string;
    
    @ApiProperty({required:false, example: 'Graduated'})
    educationalAttainment?: string;
    
    @ApiProperty({required:false, example: ''})
    schoolAttended?: string;
    
    @ApiProperty({required:false, example: ''})
    licensure?: string;
    
    @ApiProperty({required:false, example: ''})
    prcIdNo?: string;
    
    @ApiProperty({required:false, example: ''})
    noticeOffense?: string;
    
    @ApiProperty({required:false, example: ''})
    audit201?: string;
    
    @ApiProperty({required:false, example: ''})
    remarks?: string;
    
    @ApiProperty({required:false, example: ''})
    cocNo?: string;
    
    @ApiProperty({required:false, example: ''})
    vaccineStatus?: string;
    
    @ApiProperty({required:false, example: ''})
    digitalBulletin?: string;
    
    @ApiProperty({required:false, example: ''})
    viberNumber?: string;
    
    @ApiProperty({required:false, example: ''})
    vpdcEmail?: string;
    
    @ApiProperty({required:false, example: ''})
    emergencyContactPerson?: string;
    
    @ApiProperty({required:false, example: ''})
    emergencyAddress?: string;
    
    @ApiProperty({required:false, example: ''})
    emergencyContactNo?: string;
}
