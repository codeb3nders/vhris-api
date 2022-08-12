import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';
import { comparePassword } from 'src/utils/encoder';
@Injectable()
export class AuthService {
  constructor(
    private userCredentialService: UserCredentialsService,
    private jwtService: JwtService,
  ) {}

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

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
