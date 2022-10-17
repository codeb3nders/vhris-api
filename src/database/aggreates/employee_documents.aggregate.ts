import {
  aggregateFormatDate,
  aggregateLookUp,
} from 'src/utils/data/aggregate.util';

export class AggregateEmployeeDocuments {
  values() {
    return [
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'documentType',
          'code',
          'documentTypeEnum',
        ),
      },

      {
        $set: {
          dateAssigned: aggregateFormatDate('dateAssigned'),
          dateReturned: aggregateFormatDate('dateReturned'),
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
        },
      },
    ];
  }
}
