import { aggregateFormatDate } from 'src/_aggregates/helper.aggregate';

export class AggregateTimeKeeping {
  values() {
    return [
      { $addFields: { userId: '$companyAssetId' } },
      {
        $lookup: {
          from: 'company_assets',
          localField: 'userId',
          foreignField: 'id',
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
