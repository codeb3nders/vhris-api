import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { EmailService } from 'src/email/email.service';

import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';
import { CreateUserCredentialDto } from 'src/user_credentials/dto/create-user_credential.dto';
import { generatePassword } from 'src/helpers/password_generator';
import { ConfigService } from '@nestjs/config';
import { zeroPad } from 'src/helpers/number_helper';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
    @Inject(forwardRef(() => UserCredentialsService))
    private userCredentialsService: UserCredentialsService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);

    console.log(
      '------',
      createEmployeeDto.email,
      this.configService.get('EMAIL_DOMAIN'),
    );

    console.log('------', createEmployeeDto.email);

    // try {
    //   this.emailService.sendEmail(
    //     'jose.copino@vcdcph.com',
    //     createEmployeeDto.email,
    //   );
    // } catch (error) {
    //   console.log('may Xerror:', error);
    // }

    console.log('LAST EMPLOYEE');

    const lastEmployee = await this.findLast();

    const newEmployeeNo = Number(lastEmployee?.employeeNo || 0) + 1;
    createdEmployee.employeeNo = zeroPad(newEmployeeNo, 6);
    const response = await createdEmployee.save();
    if (response) {
      const password = generatePassword();

      const userCredentials: CreateUserCredentialDto = {
        employeeNo: response.employeeNo,
        timeStamp: new Date().getTime(),
        password: password,
        accessGroup: 'employee',
        isActive: true,
        email: response.email,
      };

      const userCredential = await this.userCredentialsService.create(
        userCredentials,
      );

      console.log('USER CREDENTIAL RESULT', userCredential);

      return response;
    }
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findAllWithLeaves(): Promise<any> {
    const pipeline = [
      {
        $lookup: {
          from: 'leave_requests',
          localField: 'employeeNo',
          foreignField: 'employeeNo',
          as: 'leave_requests',
        },
      },
    ];

    return this.employeeModel.aggregate(pipeline);
  }

  async findAllLeavesById(employeeNo: string): Promise<any> {
    const pipeline = [
      {
        $lookup: {
          from: 'l',
          localField: 'employeeNo',
          foreignField: 'employeeNo',
          as: 'leave_requests',
        },
      },
      {
        $match: {
          employeeNo: employeeNo,
        },
      },
    ];

    return this.employeeModel.aggregate(pipeline);
  }

  async findLast() {
    const options = {};
    return this.employeeModel.findOne({}, {}, { sort: { employeeNo: -1 } });
  }

  async findOne(employeeNo: string) {
    return this.employeeModel.findOne({ employeeNo });
  }

  async update(employeeNo: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel.updateOne(
      { employeeNo },
      { $set: { ...updateEmployeeDto } },
    );
  }

  async remove(employeeNo: string) {
    return this.employeeModel.deleteOne({ employeeNo });
  }
}
