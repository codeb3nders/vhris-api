import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnumTablesService } from 'src/enum_tables/enum_tables.service';

@Injectable()
export class ValidatorsService {
  constructor(private enumService: EnumTablesService) {}

  async validateEmployeesPostRequest(event) {
    const toCheck = [
      'citizenship',
      'userGroup',
      'civilStatus',
      // 'religion',
      'position',
      'department',
      'location',
      'employmentStatus',
      'employmentType',
      'rank',
      // 'paymentMethod',
      // 'deductPhilhealth',
      // 'fixedContributionRate',
    ];
    const undefinedList = [];
    const response = await this.enumService.find();

    const findIt = (array: any, text: string, e: string) => {
      return array
        .filter(
          (item) => item.type.toLocaleLowerCase() === e.toLocaleLowerCase(),
        )
        .find((i) => i.code.toLocaleLowerCase() === text.toLocaleLowerCase());
    };

    Object.keys(event).forEach((e) => {
      if (toCheck.includes(e)) {
        if (typeof event[e] === 'object') {
          event[e].forEach((i) => {
            const res = findIt(response, i, e);
            if (!res && event[e]) undefinedList.push(event[e]);
          });
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
