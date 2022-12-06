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
          let: { field: { $ifNull: ['$approvedBy', '$approver'] } },
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
      {
        $set: {
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
        },
      },
    ];
  }
}
