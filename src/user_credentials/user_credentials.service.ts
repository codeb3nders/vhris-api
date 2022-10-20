import { isNil } from 'lodash';
import { Injectable } from '@nestjs/common';
import { CreateUserCredentialDto } from './dto/create-user_credential.dto';
import { encodePassWord } from 'src/_utils/data/encoder';

import { EmailService } from 'src/email/email.service';
import { generatePassword } from 'src/_utils/data/password_generator.util';
import { UpdateUserCredentialDto } from './dto/update-user_credential.dto';
import { UserCredentialRepository } from 'src/_repositories/user_credential/user_credential.repository';
import { EmployeeRepository } from 'src/employees/employee.repository';
import { UserCodeRepository } from 'src/_repositories/user_codes/user_codes.repository';
import { CONSTANTS } from 'src/_utils/constants/employees';

export type User = {
  id: string;
  username: string;
  name: string;
  password: string;
};

@Injectable()
export class UserCredentialsService {
  constructor(
    private emailService: EmailService,
    private userCredentialRepository: UserCredentialRepository,
    private employeeRepository: EmployeeRepository,
    private userCodeRepository: UserCodeRepository,
  ) {}

  async create(createUserCredentialDto: CreateUserCredentialDto) {
    const { employeeNo } = createUserCredentialDto;
    const rawPassword = generatePassword();
    const password = await encodePassWord(rawPassword);

    const employee = await this.employeeRepository.findOne({ employeeNo });

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

    const response = await this.userCredentialRepository.create(
      userCredentials,
    );

    if (response) {
      response.password = rawPassword; // TODO: to be remove
      return response;
    }
    return 'fail to create';
  }

  async findAll(): Promise<CreateUserCredentialDto[]> {
    return await this.userCredentialRepository.find();
  }

  async findOne(employeeNo: string) {
    return await this.userCredentialRepository.findOne({ employeeNo });
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
      return await this.userCredentialRepository.findOneAndUpdate(
        { employeeNo },
        update,
      );
    } catch (error) {
      return `Failed updating record with id ${employeeNo}`;
    }
  }

  remove(employeeNo: string) {
    return this.userCredentialRepository.deleteOne(employeeNo);
  }

  async forgotPassword(employeeNo: string) {
    const employee = await this.employeeRepository.findOne({ employeeNo });

    if (isNil(employee)) {
      return { isValid: false, error: 'Invalid Employee Number' };
    } else {
      const code = generatePassword(5);
      const createUserCode = {
        code,
        companyEmail: employee.companyEmail,
      };

      const existing = await this.userCodeRepository.find({
        companyEmail: employee.companyEmail,
      });

      await this.userCodeRepository.insertOrUpdate(
        { companyEmail: employee.companyEmail },
        createUserCode,
      );

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

      // await this.emailService.sendMail(emailDetails);

      return { isValid: true, expiresInSeconds: CONSTANTS.TTL };
    }
  }

  async validateCode(employeeNo: string, code: string) {
    const employee = await this.employeeRepository.findOne({ employeeNo });

    if (!isNil(employee)) {
      const { companyEmail } = employee;
      return await this.userCodeRepository.findOne({ code, companyEmail });
    }
    return null;
  }

  // async changePassword(employeeNo: string) {
  //   return await this.userCredentialRepository.findOne({ employeeNo });
  //   // if code
  //   // validate code
  //   // update record
  //   // return success
  //   // else
  //   // update record
  //   // return success
  // }
}
