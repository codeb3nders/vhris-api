import {
  aggregateFormatDate,
  aggregateLookUp,
} from 'src/_aggregates/helper.aggregate';

const foreignField = 'employeeNo';
export class AggregateLeaveRequest {
  values() {
    return [
      {
        $lookup: {
          from: 'employees',
          let: { field: '$approvedBy' },
          pipeline: [
            {
              $addFields: {
                [`${foreignField}`]: { $toUpper: `$${foreignField}` },
              },
            },
            { $match: { $expr: { $eq: [`$${foreignField}`, `$$field`] } } },
            { $match: { $expr: { $ne: [``, `$$field`] } } },
          ],
          as: 'approverDetails',
        },
      },

      {
        $lookup: aggregateLookUp(
          'employees',
          'employeeNo',
          'employeeNo',
          'employeeDetails',
        ),
      },
      // {
      //   $lookup: aggregateLookUp(
      //     'employees',
      //     'employeeNo',
      //     'employeeNo',
      //     'approverDetails',
      //   ),
      // },
      {
        $set: {
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
        },
      },
    ];
  }
}
