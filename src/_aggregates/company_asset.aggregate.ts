import {
  aggregateLookUp,
  aggregateFormatDate,
} from 'src/_aggregates/helper.aggregate';

export class AggregateCompanyAsset {
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
        $lookup: aggregateLookUp(
          'asset_managements',
          'id',
          'companyAssetId',
          'assignedTo',
        ),
      },

      {
        $lookup: {
          from: 'employees',
          let: { field: '$employeeNo' },
          pipeline: [
            { $addFields: { code: '$assignedTo.employeeNo' } },
            { $match: { $expr: { $eq: ['$code', '$$field'] } } },
          ],
          as: 'employee',
        },
      },
      {
        $addFields: {
          firstName: '$employee.firstName',
          lastName: '$employee.lastName',
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
