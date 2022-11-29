import {
  aggregateFormatDate,
  aggregateLookUp,
} from 'src/_aggregates/helper.aggregate';

export class AggregateTeamLeader {
  values() {
    return [
      {
        $lookup: aggregateLookUp(
          'employees',
          'employeeNo',
          'employeeNo',
          'employeeDetails',
        ),
      },
      {
        $set: {
          startDate: aggregateFormatDate('startDate'),
          endDate: aggregateFormatDate('endDate'),
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
        },
      },
    ];
  }
}
