import { aggregateFormatDate } from 'src/_aggregates/helper.aggregate';

export class AggregateAssetManagement {
  values() {
    return [
      { $addFields: { userId: { $toObjectId: '$companyAssetId' } } },
      {
        $lookup: {
          from: 'company_assets',
          localField: 'userId',
          foreignField: '_id',
          as: 'details',
        },
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
