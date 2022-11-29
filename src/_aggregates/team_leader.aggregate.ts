import { aggregateFormatDate } from 'src/_aggregates/helper.aggregate';

export class AggregateTeamLeader {
  values() {
    return [
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
