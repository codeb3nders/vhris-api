import { HttpException, HttpStatus } from '@nestjs/common';
import { CONSTANTS } from 'src/constants/employees';
import { NotAllowedToEdit } from 'src/enums/employee.enum';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';

export const isValidRequest = (
  updateEmployeeDto: UpdateEmployeeDto,
  user: any,
) => {
  Object.keys(updateEmployeeDto).forEach((item: any) => {
    const accessGroup = user.accessGroup
      ? user.accessGroup.toUpperCase()
      : null;

    if (accessGroup === CONSTANTS.HR_ADMIN) return true;

    if (NotAllowedToEdit[item.toUpperCase()] !== undefined) {
      throw new HttpException('Not Acceptable!', HttpStatus.NOT_ACCEPTABLE);
    }
  });

  return true;
};

export const isAllowedUser = (user: any, access: string) => {
  const accessGroup = user.accessGroup ? user.accessGroup.toUpperCase() : null;

  if (accessGroup === access.toUpperCase()) {
    return true;
  }

  throw new HttpException('Not Acceptable!', HttpStatus.NOT_ACCEPTABLE);
};
