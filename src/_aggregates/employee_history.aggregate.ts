import {
  defaultItems,
  defaultSet,
} from 'src/employees/interface/employee.interface';
import { aggregateLookUp } from 'src/_aggregates/helper.aggregate';
import { withEnumValuesList } from 'src/_utils/enums/employee.enum';

export class AggregateEmployeeHistory {
  values() {
    return [...enumsLookUp()];
  }
}

const enumsLookUp = () => {
  return withEnumValuesList.map((item) => {
    return {
      $lookup: aggregateLookUp(
        'enums_table',
        `details.${item}`,
        'code',
        `${item}Enum`,
      ),
    };
  });
};
