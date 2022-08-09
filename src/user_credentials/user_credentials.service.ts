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
    const { password: rawPassword, ...rest } = createUserCredentialDto;
    const password = await encodePassWord(rawPassword);
    const body = { ...rest, password };
    // TODO: send email
    const employee = await this.employeesService.findOne(
      createUserCredentialDto.employeeNo,
    );

    if (!employee) {
      return 'No Employee found';
    }

    const createUserCredential = new this.userCredentialModel(body);
    const response = await createUserCredential.save();
    if (response) {
      // TODO: MAKE SEND EMAIL WORKING
      //  this.emailService.sendEmail(employee.email, rawPassword);
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

  update(username: string, updateUserCredentialDto: UpdateUserCredentialDto) {
    return `This action updates a #${username} userCredential`;
  }

  remove(username: string) {
    return `This action removes a #${username} userCredential`;
  }
}
