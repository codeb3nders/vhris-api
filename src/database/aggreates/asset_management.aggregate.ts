import {
  aggregateLookUp,
  aggregateFormatDate,
} from 'src/utils/data/aggregate.util';

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
