import {
  aggregateLookUp,
  aggregateFormatDate,
} from 'src/_aggregates/helper.aggregate';

export class AggregateAssetManagement {
  values() {
    return [
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'assetType',
          'code',
          'assetTypeEnum',
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
