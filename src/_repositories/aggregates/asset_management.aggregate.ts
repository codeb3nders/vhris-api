import {
  aggregateLookUp,
  aggregateFormatDate,
} from 'src/_repositories/aggregates/helper.aggregate';

export class AggregateAssetManagement {
  values() {
    return [
      {
        $lookup: aggregateLookUp(
          'enum_tables',
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
