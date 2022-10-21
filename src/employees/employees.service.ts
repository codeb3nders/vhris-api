import { Injectable } from '@nestjs/common';
import { CreateUserCredentialDto } from 'src/user_credentials/dto/create-user_credential.dto';
import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';
import { AutoCredentialEnum } from 'src/_utils/enums/employee.enum';
import { zeroPad } from 'src/_utils/numbers/number_helper.util';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    private userCredentialsService: UserCredentialsService,
    private employeeRepository: EmployeeRepository,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const lastEmployee = await this.employeeRepository.findLast();
    const newEmployeeNo = Number(lastEmployee?.employeeNo || 0) + 1;
    createEmployeeDto.employeeNo = zeroPad(newEmployeeNo);

    const response = await this.employeeRepository.create(createEmployeeDto);

    if (
      response &&
      AutoCredentialEnum[response.userGroup.toUpperCase()] !== undefined
    ) {
      const userCredentials: CreateUserCredentialDto = {
        employeeNo: response.employeeNo,
        timestamp: new Date().getTime(),

        accessGroup: response.userGroup,
        isActive: true,
        email: response.personalEmail,
      };

      const result: any = await this.userCredentialsService.create(
        userCredentials,
      );

      response.password = result.password; //TODO: to be remove

      return response;
    }
    return response;
  }

  async findAll(_params?: any): Promise<Employee[]> {
    return await this.employeeRepository.aggregateFind(_params);
  }

  async findOne(employeeNo: string): Promise<Employee> {
    return await this.employeeRepository.findOne({ employeeNo });
  }

  async aggregateFindOne(employeeNo: string, _params?: any) {
    return await this.employeeRepository.aggregateFindOne(employeeNo, _params);
  }

  async update(employeeNo: string, updateEmployeeDto: UpdateEmployeeDto) {
    updateEmployeeDto['lastModifiedDate'] = Date.now();
    return this.employeeRepository.findOneAndUpdate(
      { employeeNo },
      { $set: { ...updateEmployeeDto } },
    );
  }

  async remove(employeeNo: string) {
    const response = await this.employeeRepository.deleteMany({ employeeNo });
    if (response) {
      await this.userCredentialsService.remove(employeeNo);
    }
    return response;
  }

  async search(_params?: any): Promise<Employee[]> {
    return await this.employeeRepository.search(_params);
  }
}
