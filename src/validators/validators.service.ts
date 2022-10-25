import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnumTablesService } from 'src/enums_table/enums_table.service';

@Injectable()
export class ValidatorsService {
  constructor(private enumService: EnumTablesService) {}

  async validateEmployeesPostRequest(event, toCheck) {
    const undefinedList = [];
    const response = await this.enumService.find();

    const findIt = (array: any, text: string, attr: string) => {
      try {
        return array
          .filter(
            (item) =>
              item.type.toLocaleLowerCase() === attr.toLocaleLowerCase(),
          )
          .find((i) => i.code.toLocaleLowerCase() === text.toLocaleLowerCase());
      } catch (error) {
        throw new HttpException(
          'Error in: validateEmployeesPostRequest!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    };

    Object.keys(event).forEach((e) => {
      if (toCheck.includes(e)) {
        if (Array.isArray(event[e])) {
          event[e].forEach((i) => {
            if (typeof i === 'object') {
              throw new HttpException(
                'Object Validation is not yer supported!',
                HttpStatus.NOT_ACCEPTABLE,
              );
            } else {
              const res = findIt(response, i, e);
              if (!res && event[e]) {
                undefinedList.push(i);
              }
            }
          });
        } else if (typeof event[e] === 'object') {
          throw new HttpException(
            'Object Validation is not yer supported!',
            HttpStatus.NOT_ACCEPTABLE,
          );
        } else {
          const res = findIt(response, event[e], e);
          if (!res && event[e]) undefinedList.push(event[e]);
        }
      }
    });

    if (undefinedList.length > 0) {
      throw new HttpException(
        `Found ${
          undefinedList.length > 1 ? 'items' : 'item'
        } that are not defined in enums: [${undefinedList}]`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
