import { aggregateFormatDate } from 'src/_aggregates/helper.aggregate';

export class AggregateUserLog {
  values() {
    return [
      {
        $lookup: {
          from: 'employees',
          localField: 'employeeNo',
          foreignField: 'employeeNo',
          as: 'employeeDetails',
        },
      },

      {
        $set: {
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
        },
      },
    ];
  }
}
