import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
import { EmployeesResponseHandler } from 'src/response_handler/employees_handler.response';
import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';
import { comparePassword } from 'src/utils/data/encoder';
@Injectable()
export class AuthService {
  private employeesResponseHandler;
  constructor(
    private userCredentialService: UserCredentialsService,
    private employeeService: EmployeesService,
    private jwtService: JwtService,
  ) {
    this.employeesResponseHandler = EmployeesResponseHandler;
  }

  async validateUser(employeeNo: string, password: string): Promise<any> {
    const user = await this.userCredentialService.findOne(employeeNo);

    if (!user) throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);

    const isMatch = await comparePassword(password, user.password);

    if (isMatch) {
      const { accessGroup, isActive, employeeNo } = user;
      return { accessGroup, isActive, employeeNo };
    }
    return null;
  }

  async login(user: any) {
    const { accessGroup, isActive, employeeNo } = user;
    const payload = {
      accessGroup,
      isActive,
      employeeNo,
    };
    const employee = await this.employeeService.findOne(employeeNo);

    const formatResponse = this.employeesResponseHandler.ok(employee);
    console.log({ formatResponse });
    return {
      access_token: this.jwtService.sign(payload),
      userInfo: formatResponse,
    };
  }
}
