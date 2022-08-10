import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';
import { CreateUserCredentialDto } from 'src/user_credentials/dto/create-user_credential.dto';
import { generatePassword } from 'src/helpers/password_generator';
import { zeroPad } from 'src/helpers/number_helper';
import { AutoCredentialEnum } from 'src/enums/employee.enum';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
    @Inject(forwardRef(() => UserCredentialsService))
    private userCredentialsService: UserCredentialsService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);

    const lastEmployee = await this.findLast();
    const newEmployeeNo = Number(lastEmployee?.employeeNo || 0) + 1;
    createdEmployee.employeeNo = zeroPad(newEmployeeNo);
    const response = await createdEmployee.save();

    if (
      response &&
      AutoCredentialEnum[response.userGroup.toUpperCase()] !== undefined
    ) {
      const password = generatePassword();
      const userCredentials: CreateUserCredentialDto = {
        employeeNo: response.employeeNo,
        timeStamp: new Date().getTime(),
        password: password,
        accessGroup: response.userGroup,
        isActive: true,
        email: response.personalEmail,
      };

      await this.userCredentialsService.create(userCredentials);

      response.password = password;

      return response;
    }
    return response;
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
