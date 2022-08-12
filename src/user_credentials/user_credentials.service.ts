import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserCredentialDto } from './dto/create-user_credential.dto';
import { UpdateUserCredentialDto } from './dto/update-user_credential.dto';
import {
  UserCredentialDocument,
  User_credential,
} from './entities/user_credential.entity';
import { encodePassWord } from 'src/utils/encoder';

import { EmployeesService } from 'src/employees/employees.service';
import { EmailService } from 'src/email/email.service';
import { generatePassword } from 'src/helpers/password_generator';

export type User = {
  id: string;
  username: string;
  name: string;
  password: string;
};

@Injectable()
export class UserCredentialsService {
  constructor(
    @InjectModel(User_credential.name)
    private userCredentialModel: Model<UserCredentialDocument>,
    @Inject(forwardRef(() => EmployeesService))
    private employeesService: EmployeesService,
    private emailService: EmailService,
  ) {}

  async create(createUserCredentialDto: CreateUserCredentialDto) {
    const { employeeNo } = createUserCredentialDto;
    const rawPassword = generatePassword();
    const password = await encodePassWord(rawPassword);

    const employee = await this.employeesService.findOne(employeeNo);

    if (!employee) {
      return 'No Employee found';
    }

    const userCredentials: CreateUserCredentialDto = {
      employeeNo: employee.employeeNo,
      timeStamp: new Date().getTime(),
      password: password,
      accessGroup: employee.userGroup,
      isActive: true,
    };

    const createUserCredential = new this.userCredentialModel(userCredentials);
    const response = await createUserCredential.save();

    if (response) {
      // TODO: MAKE SEND EMAIL WORKING
      // this.emailService.sendEmail(employee.personalEmail, rawPassword);
      response.password = rawPassword; // TODO: to be remove
      return response;
    }
    return 'fail to create';
  }

  async findAll(): Promise<CreateUserCredentialDto[]> {
    return await this.userCredentialModel.find();
  }

  async findOne(employeeNo: string) {
    return await this.userCredentialModel.findOne({ employeeNo });
  }

  remove(employeeNo: string) {
    return this.userCredentialModel.deleteOne({ employeeNo });
  }
}
