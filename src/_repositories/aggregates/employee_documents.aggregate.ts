import {
  aggregateFormatDate,
  aggregateLookUp,
} from 'src/_repositories/aggregates/helper.aggregate';

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
