import { isNil } from 'lodash';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserCredentialDto } from './dto/create-user_credential.dto';
import {
  UserCredentialDocument,
  UserCredential,
} from './entities/user_credential.entity';
import { encodePassWord } from 'src/_utils/data/encoder';

import { EmployeesService } from 'src/employees/employees.service';
import { EmailService } from 'src/email/email.service';
import { generatePassword } from 'src/_utils/data/password_generator.util';
import { UpdateUserCredentialDto } from './dto/update-user_credential.dto';
import { UserCode, UserCodeDocument } from './entities/user_code.entity';

export type User = {
  id: string;
  username: string;
  name: string;
  password: string;
};

@Injectable()
export class UserCredentialsService {
  constructor(
    @InjectModel(UserCredential.name)
    private userCredentialModel: Model<UserCredentialDocument>,
    @InjectModel(UserCode.name)
    private userCodeModel: Model<UserCodeDocument>,
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
      timestamp: new Date().getTime(),
      password: password,
      accessGroup: employee.userGroup,
      isActive: true,
    };

    const createUserCredential = new this.userCredentialModel(userCredentials);
    const response = await createUserCredential.save();

    if (response) {
      this.emailService.sendEmail(employee, rawPassword);
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

  async update(
    employeeNo: string,
    updateUserCredentialDto: UpdateUserCredentialDto,
  ) {
    updateUserCredentialDto['lastModifiedDate'] = Date.now();
    updateUserCredentialDto.password = await encodePassWord(
      updateUserCredentialDto.password,
    );

    const update = updateUserCredentialDto;
    try {
      return await this.userCredentialModel.updateOne({ employeeNo }, update);
    } catch (error) {
      return `Failed updating record with id ${employeeNo}`;
    }
  }

  remove(employeeNo: string) {
    return this.userCredentialModel.deleteOne({ employeeNo });
  }

  async forgotPassword(employeeNo: string) {
    const employee = await this.employeesService.findOne(employeeNo);

    if (isNil(employee)) {
      throw new Error('Invalid Employee Number');
    } else {
      const code = generatePassword(5);
      const createUserCode = new this.userCodeModel({
        code,
        companyEmail: employee.companyEmail,
      });

      await createUserCode.save();

      const emailDetails = {
        to: employee.companyEmail,
        subject: 'Forgot password request.',
        text: `You may use this code: ${code} to authenticate forgot password request.`,
        html: `
        <h3>Authentication Code</h3>
        <p>Hi ${employee.firstName}, </p>
        <p>Use this code: <strong>${code}</strong> to authenticate your "Forgot Password" Request. </p>
        <p>Thank you.</p>
        `,
      };

      await this.emailService.sendMail(emailDetails);

      return { code, email: employee.companyEmail };
    }
  }

  async validateCode(employeeNo: string, code: string) {
    const employee = await this.employeesService.findOne(employeeNo);

    if (!isNil(employee)) {
      const { companyEmail } = employee;
      return await this.userCodeModel.findOne({ code, companyEmail });
    }
    return null;
  }

  async changePassword(employeeNo: string) {
    return await this.userCredentialModel.findOne({ employeeNo });
    // if code
    // validate code
    // update record
    // return success
    // else
    // update record
    // return success
  }
}
